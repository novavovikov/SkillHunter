import React from 'react'
import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Text from '../components/Text'
import Section from '../components/Section'

class Tos extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['tos']
    }
  }

  getBlocksContent () {
    const { i18n, lng } = this.props

    try {
      return i18n.store.data[lng].tos.blocks || []
    } catch (e) {
      return []
    }
  }

  render () {
    const { t } = this.props

    return (
      <Page>
        <Text
          title={t('title')}
          subtitle={t('subtitle') !== 'subtitle' && t('subtitle')}
        >
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

export default withNamespaces('tos')(Tos)
