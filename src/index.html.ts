import { flagEn, flagFr, flagSv } from "./flags.html.ts";

export type Assets = {
  css: string;
  js: string;
};

export const html = ({ css, js }: Assets): string => /* HTML */ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Matthieu Bresson</title>
    <meta
      name="description"
      content="Personal homepage of Matthieu Bresson."
    />
    <style>${css}</style>
  </head>
  <body>
    <div class="page">
      <header class="topbar">
        <div class="identity">
          <img
            class="photo"
            src="assets/photo.jpg"
            alt="Portrait of Matthieu Bresson"
            width="52"
            height="52"
          />
          <span class="name">Matthieu Bresson</span>
        </div>

        <nav class="languages" aria-label="Language">
          <button type="button" class="flag" lang="en" aria-label="English" aria-pressed="true">
            ${flagEn}
          </button>
          <button type="button" class="flag" lang="fr" aria-label="Français" aria-pressed="false">
            ${flagFr}
          </button>
          <button type="button" class="flag" lang="sv" aria-label="Svenska" aria-pressed="false">
            ${flagSv}
          </button>
        </nav>
      </header>

      <main>
        <h1>
          Hello — I'm Matthieu. I make things, read too many books, and believe
          in <em>slow, careful work</em>.
        </h1>

        <p>
          I live in Sweden, where I spend my days on
          <a href="#">a job I like</a> and my evenings on whatever has caught my
          curiosity that week. This is a small, quiet home for some of it.
        </p>
        <p>
          If something here resonates, I'd love to hear from you. You can find
          me on
          <a href="https://www.linkedin.com/in/matthieu-bresson">LinkedIn</a>
          and <a href="https://github.com/mbresson">GitHub</a>.
        </p>

        <section class="now" aria-labelledby="now-title">
          <h2 id="now-title">Now</h2>
          <dl>
            <div>
              <dt>Reading</dt>
              <dd>Gilead, by Marilynne Robinson</dd>
            </div>
            <div>
              <dt>Learning</dt>
              <dd>To draw with ink and a single brush</dd>
            </div>
            <div>
              <dt>Planning</dt>
              <dd>A walk along the coast of Brittany</dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
    <script>${js}</script>
  </body>
</html>
`;
