const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const renderHtml = require('../src/html');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    stats: 'minimal'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
    new HtmlWebpackPlugin({
      templateContent: renderHtml(),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
});
