module.exports = env => ({
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  optimization: require('./webpack/optimization')(env),
  module: require('./webpack/module')(env),
  plugins: require('./webpack/plugins')(env),
  devServer: require('./webpack/devServer')(env),
})
