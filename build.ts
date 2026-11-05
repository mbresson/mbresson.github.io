import { watch } from "node:fs";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
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

// Bundle index.html.ts on every build (inlining the modules it imports) and
// import the result. The code is part of the URL, so each edit is a new module
// and Node's import cache never serves a stale version in dev mode.
const loadHtml = async (): Promise<(assets: Assets) => string> => {
  const result = await build({
    entryPoints: ["src/index.html.ts"],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
  });
  const code = result.outputFiles[0].text;
  return (await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`)).html;
};

const run = async (): Promise<void> => {
  const start = performance.now();
  const [css, js, html] = await Promise.all([
    buildCss(),
    buildJs(),
    loadHtml(),
  ]);
  await mkdir("dist", { recursive: true });
  await cp("src/assets", "dist/assets", { recursive: true });
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
