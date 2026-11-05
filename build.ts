import { watch } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { build, transform } from "esbuild";
import type { Assets } from "./src/index.html.ts";

const isDev = process.argv.includes("--dev");

const buildCss = async (): Promise<string> => {
  const source = await readFile("src/style.css", "utf8");
  const { code } = await transform(source, { loader: "css", minify: true });
  return code.trim();
};

const buildJs = async (): Promise<string> => {
  const result = await build({
    entryPoints: ["src/script.ts"],
    bundle: true,
    minify: true,
    sourcemap: isDev && "inline",
    format: "iife",
    target: "es2022",
    write: false,
  });
  return result.outputFiles[0].text.trim();
};

// The query string makes Node treat each build as a new module, so edits to
// index.html.ts are picked up in dev mode (a plain import() would be cached).
const loadHtml = async (): Promise<(assets: Assets) => string> =>
  (await import(`./src/index.html.ts?t=${Date.now()}`)).html;

const run = async (): Promise<void> => {
  const start = performance.now();
  const [css, js, html] = await Promise.all([
    buildCss(),
    buildJs(),
    loadHtml(),
  ]);
  await mkdir("dist", { recursive: true });
  await writeFile("dist/index.html", html({ css, js }));
  console.log(
    `Built dist/index.html in ${Math.round(performance.now() - start)}ms`,
  );
};

if (!isDev) {
  await run();
} else {
  let timer: NodeJS.Timeout | undefined;
  const rebuild = (): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      run().catch((error: unknown) => console.error(error));
    }, 50);
  };

  watch("src", { recursive: true }, rebuild);
  console.log("Watching src/ for changes...");
  rebuild();
}
