import App from './app';
import React from 'react';
import { hydrate, render } from 'react-dom';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes) {
  const preloaded = window.__PRELOADED__;
  delete window.__PRELOADED__;
  hydrate(<App preloaded={preloaded} />, rootElement);
} else {
  render(<App />, rootElement);
}
