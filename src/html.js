module.exports = (assets = { styles: {}, javascript: {}}, html = '', preloadedMovie = '') => (
  `
    <!doctype html>
    <html>
      <head>
        <title>React PWA Demo</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${Object.keys(assets.styles).map(style => `<link href="${assets.styles[style]}" rel="stylesheet" type="text/css" />`).join('')}
      </head>
      <body>
        <div id="root">${html}</div>
        ${preloadedMovie &&
          `
            <script>
              window.__PRELOADED__ = ${JSON.stringify(preloadedMovie).replace(/</g, '\\u003c')}
            </script>
          `}
        ${Object.keys(assets.javascript).map(js => `<script src="${assets.javascript[js]}" />`).join('')}
      </body>
    </html>
  `
);
