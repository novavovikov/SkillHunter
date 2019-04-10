const postcssCssNext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
const postcssApply = require('postcss-apply')

module.exports = {
  plugins: [
    postcssCssNext({
      features: {
        customProperties: {
          warnings: false
        }
      }
    }),
    postcssImport,
    postcssApply
  ]
}