const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

// const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),

    new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-config')),

    new InjectManifest({
      swDest: path.resolve(__dirname, '..', 'build/sw.js'),
      swSrc: path.resolve(__dirname, '..', 'src/sw-template.js'),
      include: ['/app-shell', /\.js$/, /\.css$/],
      templatedUrls: {
        '/app-shell': new Date().toString(),
      },
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});
