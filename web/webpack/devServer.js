module.exports = () => ({
  stats: 'errors-only',
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 3000,
  proxy: {
    '/api': 'http://backend:4321',
  },
})
