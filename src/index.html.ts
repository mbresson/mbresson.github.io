import { flagEn, flagFr, flagSv } from "./flags.html.ts";
import {
  LANGUAGES,
  translate,
  translateText,
  type Language,
} from "./translation/index.ts";

export { LANGUAGES, type Language };

// Canonical origin, used for hreflang/canonical links.
const SITE_URL = "https://matthieu-bresson.com";

const FLAGS: Record<Language, string> = { en: flagEn, fr: flagFr, sv: flagSv };

// Each language's own name, deliberately not translated.
const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  fr: "Français",
  sv: "Svenska",
};

/** URL path of a language's page: English is the root, others get a folder. */
export const pagePath = (lang: Language): string =>
  lang === "en" ? "/" : `/${lang}/`;

export type PageOptions = {
  lang: Language;
};

export const html = ({ lang }: PageOptions): string => /* HTML */ `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${translateText("meta.title", lang)}</title>
    <meta name="description" content="${translateText("meta.description", lang)}" />
    <link rel="icon" href="/assets/favicon.ico" sizes="16x16 32x32 48x48" />
    <link rel="canonical" href="${SITE_URL}${pagePath(lang)}" />
    ${LANGUAGES.map(
      (l) => /* HTML */ `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${pagePath(l)}" />`,
    ).join("\n    ")}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="page">
      <header class="topbar">
        <div class="identity">
          <img
            class="photo"
            src="/assets/photo.webp"
            alt="${translateText("photo.alt", lang)}"
            width="52"
            height="52"
          />
          <span class="name">Matthieu Bresson</span>
        </div>

        <nav class="languages" aria-label="${translateText("aria.language", lang)}">
          ${LANGUAGES.map(
            (l) => /* HTML */ `<a class="flag" href="${pagePath(l)}" hreflang="${l}" lang="${l}" aria-label="${LANGUAGE_NAMES[l]}"${l === lang ? ' aria-current="page"' : ""}>${FLAGS[l]}</a>`,
          ).join("\n          ")}
        </nav>
      </header>

      <main>
        <h1>${translate("headline", lang)}</h1>

        <p>${translate("intro", lang)}</p>
        <p>${translate("contact", lang)}</p>

        <section class="now" aria-labelledby="now-title">
          <h2 id="now-title">${translate("now.title", lang)}</h2>
          <dl>
            <div>
              <dt>${translate("now.reading.label", lang)}</dt>
              <dd>${translate("now.reading.value", lang)}</dd>
            </div>
            <div>
              <dt>${translate("now.learning.label", lang)}</dt>
              <dd>${translate("now.learning.value", lang)}</dd>
            </div>
            <div>
              <dt>${translate("now.planning.label", lang)}</dt>
              <dd>${translate("now.planning.value", lang)}</dd>
            </div>
          </dl>
        </section>
      </main>

      ${lang === "fr"
        ? ""
        : /* HTML */ `<footer class="footnotes">
        <p>${translate("pronunciation.note", lang)}</p>
      </footer>`}
    </div>
  </body>
</html>
`;
