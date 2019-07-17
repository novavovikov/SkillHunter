const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
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
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  }),
]
