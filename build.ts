import { watch } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize } from "node:path";
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { build, transform } from "esbuild";
import type * as Page from "./src/index.html.ts";

const isDev = process.argv.includes("--dev");

const buildCss = async (): Promise<void> => {
  const source = await readFile("src/style.css", "utf8");
  const { code } = await transform(source, { loader: "css", minify: true });
  await writeFile("docs/style.css", code);
};

// Bundle index.html.ts on every build (inlining the modules it imports) and
// import the result. The code is part of the URL, so each edit is a new module
// and Node's import cache never serves a stale version in dev mode.
const loadPage = async (): Promise<typeof Page> => {
  const result = await build({
    entryPoints: ["src/index.html.ts"],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
};

const run = async (): Promise<void> => {
  const start = performance.now();
  await mkdir("docs", { recursive: true });
  const [page] = await Promise.all([loadPage(), buildCss()]);
  await cp("src/assets", "docs/assets", { recursive: true });
  for (const lang of page.LANGUAGES) {
    // "/" -> docs/index.html, "/fr/" -> docs/fr/index.html
    const file = `docs${page.pagePath(lang)}index.html`;
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, page.html({ lang }));
  }
  console.log(
    `Built ${page.LANGUAGES.length} pages in ${Math.round(performance.now() - start)}ms`,
  );
};

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

// Minimal static server for docs/, since pages use root-absolute URLs.
const serveDev = (port: number): void => {
  createServer(async (req, res) => {
    const path = decodeURIComponent((req.url ?? "/").split("?")[0]);
    const file = normalize(join("docs", path.endsWith("/") ? `${path}index.html` : path));
    try {
      if (!file.startsWith("docs")) throw new Error("outside docs");
      const body = await readFile(file);
      res.writeHead(200, { "Content-Type": MIME_TYPES[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end("Not found");
    }
  }).listen(port, () => console.log(`Serving docs/ at http://localhost:${port}`));
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

  serveDev(3000);
  watch("src", { recursive: true }, rebuild);
  console.log("Watching src/ for changes...");
  rebuild();
}
