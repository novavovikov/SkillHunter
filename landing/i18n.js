const NextI18Next = require('next-i18next/dist/commonjs')

const NextI18NextInstance = new NextI18Next({
  localeSubpaths: 'foreign',
  otherLanguages: ['ru'],
  fallbackLng: 'en',
})

module.exports = NextI18NextInstance
