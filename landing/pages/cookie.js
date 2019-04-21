import React from 'react'
import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Text from '../components/Text'
import Section from '../components/Section'

class Cookie extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['cookie'],
    }
  }

  getBlocksContent () {
    const { i18n, lng } = this.props

    try {
      const content = i18n.store.data[lng].cookie.blocks
      return i18n.store.data[lng].cookie.blocks
    } catch (e) {
      return []
    }
  }

  render () {
    const { t } = this.props

    return (
      <Page>
        <Text title={t('title')}>
          {this.getBlocksContent().map((item, index) => (
            <Section
              key={index}
              title={item.title}
              text={item.text}
            />
          ))}
        </Text>
      </Page>
    )

  }
}

export default withNamespaces('cookie')(Cookie)
