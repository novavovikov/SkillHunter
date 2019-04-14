import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
  localeSubpaths: 'foreign',
  otherLanguages: ['ru'],
  fallbackLng: 'en',
})

export default NextI18NextInstance

export const {
  appWithTranslation,
  withNamespaces,
} = NextI18NextInstance
