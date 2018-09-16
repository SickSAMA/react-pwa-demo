var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools

module.exports = {

  // when adding "js" extension to asset types
  // and then enabling debug mode, it may cause a weird error:
  //
  // [0] npm run start-prod exited with code 1
  // Sending SIGTERM to other processes..
  //
  // debug: true,
  webpack_assets_file_path: 'build/webpack-assets.json',

  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ]
    },
    svg: {
      extension: 'svg'
    },
    style_modules: {
      extensions: ['css', 'scss'],
      filter: function (module, regex, options, log) {
        if (options.development) {
          // in development e's webpack "style-loader",
          // so the module.name is not equal to module.name
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
      },
      path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
      parser: WebpackIsomorphicToolsPlugin.css_modules_loader_parser
    }
  }
};
