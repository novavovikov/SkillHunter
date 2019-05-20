module.exports = {
  stats: 'errors-only',
  hot: true,
  historyApiFallback: true,
  host: 'localhost',
  port: 3000,
  proxy: {
    '/api': 'http://localhost:4000',
  },
}
