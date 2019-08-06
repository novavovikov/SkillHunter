const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => ([
  new CopyWebpackPlugin([
    {
      context: 'public/static',
      from: '**/*',
      to: './',
    },
  ]),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './public/index.html',
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(env),
  }),
])
