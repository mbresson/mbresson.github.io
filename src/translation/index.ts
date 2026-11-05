import { TRANSLATIONS_EN } from "./en.ts";
import { TRANSLATIONS_FR } from "./fr.ts";
import { TRANSLATIONS_SV } from "./sv.ts";

// keyof a union keeps only the keys shared by all languages.
export type TranslationKey = keyof (
  | typeof TRANSLATIONS_EN
  | typeof TRANSLATIONS_FR
  | typeof TRANSLATIONS_SV
);

// Keys used in attributes and <title>: plain text, no inline HTML.
export type TextTranslationKey = Extract<
  TranslationKey,
  `meta.${string}` | `aria.${string}` | `photo.${string}`
>;
// Keys used as page content: may contain inline HTML.
export type HtmlTranslationKey = Exclude<TranslationKey, TextTranslationKey>;

export const LANGUAGES = ["en", "fr", "sv"] as const;
export type Language = (typeof LANGUAGES)[number];

const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  en: TRANSLATIONS_EN,
  fr: TRANSLATIONS_FR,
  sv: TRANSLATIONS_SV,
};

const escapeHtml = (text: string): string =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Page content: a span tagged with its key, holding the (HTML) translation. */
export const translate = (key: HtmlTranslationKey, lang: Language): string =>
  `<span data-translation-key="${key}">${TRANSLATIONS[lang][key]}</span>`;

/** Plain, escaped text, for attributes and <title>. */
export const translateText = (key: TextTranslationKey, lang: Language): string =>
  escapeHtml(TRANSLATIONS[lang][key]);
