# AGENTS.md

## Project layout

- `src/index.html.ts`: exports `html({ lang }): string`, which returns the whole page's HTML as a multiline template string (preceded by a `/* HTML */` comment for editor syntax highlighting).
- `src/flags.html.ts`: the language flag SVGs.
- `src/translation/`: `en.ts`, `fr.ts`, `sv.ts` hold the page text by key; every key must exist in all three. `index.ts` exports `TranslationKey`, `LANGUAGES`, `translate(key, lang)` (page content; values may contain inline HTML; returns a `<span data-translation-key>`) and `translateText(key, lang)` (escaped plain text for attributes and `<title>`; keys prefixed `meta.`, `aria.` or `photo.`).
- `src/style.css`: the page's stylesheet.
- `build.ts`: build script (esbuild). Minifies the CSS into `dist/style.css` (linked, not inlined), renders one page per language (`dist/index.html` for English, `dist/fr/index.html`, `dist/sv/index.html`) and copies `src/assets/` to `dist/assets/`. Run with `npm run dist`, or `npm run dev` to rebuild on changes in `src/` and serve `dist/` at http://localhost:3000 (pages use root-absolute URLs like `/assets/photo.webp`, so they must be served, not opened from disk).
- `dist/`: build output. Git-ignored; keep it out of version control.

## Conventions

- Prefer arrow functions over `function` declarations (e.g. `export const html = (): string => ...`).
- Keep the `/* HTML */` comment before HTML template strings.
