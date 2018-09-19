import Express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fetchDog from './app/fetchDog';
import renderHtml from './html';
import App from './app';

const app = Express();
const port = 3000;

// Serve static files
app.use(Express.static(path.resolve(__dirname, '..', 'build'), {
  maxAge: 365 * 24 * 3600000 // long time cache static files
}));

function hydrateOnClient() {
  return renderHtml({
    assets: webpackIsomorphicTools.assets(), // eslint-disable-line
    enableSW: true
  });
}

app.use('/app-shell', (req, res) => {
  res.send(hydrateOnClient());
});

// serve request
app.use((req, res) => {

  fetchDog()
    .then(response => {
      const preloaded = response.data;

      // render the app
      const html = renderToString(<App preloaded={preloaded} />);

      // Send the rendered page back to the client
      res.send(renderHtml({
        assets: webpackIsomorphicTools.assets(), // eslint-disable-line
        html,
        preloaded,
        enableSW: true
      }));
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      res.send(hydrateOnClient());
    });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> Open localhost:%s in a browser to view the app.', port);
});
