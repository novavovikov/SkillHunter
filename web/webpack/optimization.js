module.exports = () => ({
  splitChunks: {
    chunks: 'async',
    minSize: 14000,
    minChunks: 1,
    maxAsyncRequests: 10,
    maxInitialRequests: 10,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
      },

      default: {
        minChunks: 1,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  },
  runtimeChunk: true,
})
