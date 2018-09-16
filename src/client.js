import App from './app';
import React from 'react';
import { hydrate, render } from 'react-dom';

const preloadedMovie = window.__PRELOADED_MOVIE__;
delete window.__PRELOADED_MOVIE__;

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes) {
  hydrate(<App preloadedMovie={preloadedMovie} />, rootElement);
} else {
  render(<App />, rootElement);
}
