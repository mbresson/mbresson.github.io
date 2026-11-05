export type Assets = {
  css: string;
  js: string;
};

export const html = ({ css, js }: Assets): string => /* HTML */ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
    <style>${css}</style>
  </head>
  <body>
    Hello World
    <script>${js}</script>
  </body>
</html>
`;
