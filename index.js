require("@babel/register"); // eslint-disable-line

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools-config'))
  .server(__dirname, function () {
    require('./src/server');
  });
