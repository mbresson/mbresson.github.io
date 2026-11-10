import type { TRANSLATIONS_EN } from "./en.ts";

export const TRANSLATIONS_SV = {
  "meta.title": "Matthieu Bresson",
  "meta.description": "Matthieu Bressons personliga hemsida.",
  "aria.language": "Språk",
  "photo.alt": "Porträtt av Matthieu Bresson",
  headline: `Hej! Jag heter Matt<sup>1</sup>. Jag är mjukvaruingenjör i Sverige. Stig in och slå dig ner!`,
  intro: `<em>Vad värdesätter du mest i ditt liv?</em><br />För mig är det att jobba med smarta och snälla kollegor för att bygga en spännande produkt – och samtidigt växa och lära mig nya färdigheter.<br/>På fritiden hittar du mig ute på promenad i naturen eller tillsammans med vänner och familj (och katter!). Jag säger heller inte nej till en bra bok eller ett brädspel.`,
  contact: `Du kan säga hej på <a href="https://www.linkedin.com/in/matthieu-bresson">LinkedIn</a> eller <a href="https://github.com/mbresson">GitHub</a>!`,
  "pronunciation.note": `<sup>1</sup> Matthieu uttalas /ma.tjø/, men du kan kalla mig Matt istället!`,
  "now.title": "Nu",
  "now.reading.label": "Läser",
  "now.reading.value":
    "Spinning Silver av Naomi Novik<br />Les Peuples du Nord : De Fróði à Harald l'Impitoyable av Lucie Malbos",
  "now.learning.label": "Lär mig",
  "now.learning.value": "Att tala svenska",
  "now.planning.label": "Planerar",
  "now.planning.value": "En färjeresa till Helsingfors eller Gotland",
} as const satisfies Record<keyof typeof TRANSLATIONS_EN, string>;
