import type { TRANSLATIONS_EN } from "./en.ts";

export const TRANSLATIONS_SV = {
  "meta.title": "Matthieu Bresson",
  "meta.description": "Matthieu Bressons personliga hemsida.",
  "aria.language": "Språk",
  "photo.alt": "Porträtt av Matthieu Bresson",
  headline: `Hej! Jag heter Matthieu<sup>1</sup>. Jag är en mjukvaruingenjör bosatt i Sverige. Jag tror att livet handlar om att <em>växa</em> steg för steg och <em>dela</em> upplevelser med andra människor <small>(och katter!)</small>.`,
  intro: `Jag bor i Sverige, där jag ägnar dagarna åt <a href="#">ett jobb jag trivs med</a> och kvällarna åt det som har väckt min nyfikenhet den veckan. Det här är ett litet, stilla hem för en del av det.`,
  contact: `Om något här talar till dig får du gärna höra av dig. Du hittar mig på <a href="https://www.linkedin.com/in/matthieu-bresson">LinkedIn</a> och <a href="https://github.com/mbresson">GitHub</a>.`,
  "pronunciation.note": `<sup>1</sup> Matthieu uttalas /ma.tjø/, men du kan kalla mig Matt istället!`,
  "now.title": "Nu",
  "now.reading.label": "Läser",
  "now.reading.value": "Gilead av Marilynne Robinson",
  "now.learning.label": "Lär mig",
  "now.learning.value": "Att teckna med bläck och en enda pensel",
  "now.planning.label": "Planerar",
  "now.planning.value": "En vandring längs Bretagnes kust",
} as const satisfies Record<keyof typeof TRANSLATIONS_EN, string>;
