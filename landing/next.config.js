const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withImages(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]--[hash:base64:5]",
  },
  exportPathMap: async function() {
    return {
      '/google8528642f714e0119.html': { page: '/google8528642f714e0119' },
    }
  }
}))
