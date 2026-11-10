import type { TRANSLATIONS_EN } from "./en.ts";

export const TRANSLATIONS_FR = {
  "meta.title": "Matthieu Bresson",
  "meta.description": "Page personnelle de Matthieu Bresson.",
  "aria.language": "Langue",
  "photo.alt": "Portrait de Matthieu Bresson",
  headline: `Bonjour ! Je suis Matthieu, ingénieur logiciel installé en Suède. Entrez, installez-vous !`,
  intro: `<em>Qu’est-ce qui compte le plus dans votre vie ?</em><br />Pour moi, c’est unir mes forces avec des collègues brillants et bienveillants pour créer un produit passionnant - et m’améliorer tout du long.<br/>En dehors du travail, vous me trouverez en train de marcher dans la nature et de passer du temps avec les amis et la famille (et les chats !). Et je ne dis jamais non à un bon livre ou un jeu de société.`,
  contact: `N’hésitez pas à dire bonjour sur <a href="https://www.linkedin.com/in/matthieu-bresson">LinkedIn</a> ou <a href="https://github.com/mbresson">GitHub</a> !`,
  "pronunciation.note": `<sup>1</sup> Matthieu se prononce /ma.tjø/, mais vous pouvez simplement m’appeler Matt !`,
  "now.title": "En ce moment",
  "now.reading.label": "Lecture",
  "now.reading.value":
    "Le fleuve céleste, de Guy Gavriel Kay<br />Les Peuples du Nord : De Fróði à Harald l'Impitoyable, de Lucie Malbos",
  "now.learning.label": "Apprentissage",
  "now.learning.value": "Parler suédois",
  "now.planning.label": "Projet",
  "now.planning.value": "Une traversée en ferry vers Helsinki ou Gotland",
} as const satisfies Record<keyof typeof TRANSLATIONS_EN, string>;
