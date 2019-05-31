module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
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
