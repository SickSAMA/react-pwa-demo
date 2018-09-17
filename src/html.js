module.exports = (options = {}) => {
  const { assets = { styles: {}, javascript: {}}, html = '', preloaded= '', enableSW = false } = options;
  
  return (
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
          ${preloaded&&
            `
              <script>
                window.__PRELOADED__= ${JSON.stringify(preloaded).replace(/</g, '\\u003c')}
              </script>
            `}
          ${Object.keys(assets.javascript).map(js => `<script src="${assets.javascript[js]}"></script>`).join('')}
          ${enableSW ? `
            <script>
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            </script>` : ''}
        </body>
      </html>
    `
  );
};
