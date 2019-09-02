module.exports = () => ({
  stats: 'errors-only',
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 3004,
  proxy: {
    '/api': 'http://backend:6000',
  },
})
