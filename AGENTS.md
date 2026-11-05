# AGENTS.md

## Project layout

- `src/index.html.ts`: exports `html(): string`, which returns the whole page's HTML as a multiline template string (preceded by a `/* HTML */` comment for editor syntax highlighting).
- `src/script.ts`: client-side TypeScript for the page.
- `src/style.css`: the page's stylesheet.
- `build.ts`: build script (esbuild). Minifies the CSS, bundles and minifies the script, calls `html({ css, js })` and writes `dist/index.html`. Run with `npm run dist`, or `npm run dev` to rebuild on changes in `src/`.
- `dist/`: build output. Git-ignored; keep it out of version control.

## Conventions

- Prefer arrow functions over `function` declarations (e.g. `export const html = (): string => ...`).
- Keep the `/* HTML */` comment before HTML template strings.
