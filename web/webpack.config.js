module.exports = {
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: require('./webpack/optimization'),
  module: require('./webpack/module'),
  plugins: require('./webpack/plugins'),
  devServer: require('./webpack/devServer'),
}
