import Express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { fetchMovie } from './app/fetch';
import renderHtml from './html';
import App from './app';

const app = Express();
const port = 3000;

// Serve static files
app.use(Express.static(path.resolve(__dirname, '..', 'build')));

// serve request
app.use((req, res) => {

  function hydrateOnClient() {
    res.send(renderHtml(webpackIsomorphicTools.assets())); // eslint-disable-line
  }

  fetchMovie()
    .then(response => {
      const preloadedMovie = response.data;

      // render the app
      const html = renderToString(<App preloadedMovie={preloadedMovie} />);

      // Send the rendered page back to the client
      res.send(renderHtml(webpackIsomorphicTools.assets(), html, preloadedMovie)); // eslint-disable-line
    })
    .catch(err => {
      console.error(err);
      res.status(500);
      hydrateOnClient();
    });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> Open localhost:%s in a browser to view the app.', port);
});
