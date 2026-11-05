import type { TRANSLATIONS_EN } from "./en.ts";

export const TRANSLATIONS_FR = {
  "meta.title": "Matthieu Bresson — Page d'accueil",
  "meta.description": "Page personnelle de Matthieu Bresson.",
  "aria.language": "Langue",
  "photo.alt": "Portrait de Matthieu Bresson",
  headline: `Bonjour — je suis Matthieu. Je fabrique des choses, je lis trop de livres, et je crois au <em>travail lent et soigné</em>.`,
  intro: `Je vis en Suède, où je passe mes journées dans <a href="#">un travail que j'aime</a> et mes soirées sur tout ce qui a piqué ma curiosité cette semaine-là. Voici un petit coin tranquille pour une partie de tout cela.`,
  contact: `Si quelque chose ici vous parle, j'aimerais beaucoup avoir de vos nouvelles. Vous me trouverez sur <a href="https://www.linkedin.com/in/matthieu-bresson">LinkedIn</a> et <a href="https://github.com/mbresson">GitHub</a>.`,
  "now.title": "Maintenant",
  "now.reading.label": "Lecture",
  "now.reading.value": "Gilead, de Marilynne Robinson",
  "now.learning.label": "Apprentissage",
  "now.learning.value": "Dessiner à l'encre avec un seul pinceau",
  "now.planning.label": "Projet",
  "now.planning.value": "Une balade le long de la côte de Bretagne",
} as const satisfies Record<keyof typeof TRANSLATIONS_EN, string>;
