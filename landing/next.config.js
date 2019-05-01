const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withImages(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]--[hash:base64:5]",
  }
}))
