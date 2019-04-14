import React from 'react'
import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Text from '../components/Text'
import Section from '../components/Section'

const CONTENT = [
  'notification',
  'types',
  'similar',
  'control',
  'conclusion'
]

class Privacy extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['privacy']
    }
  }

  render () {
    const { t } = this.props

    return (
      <Page>
        <Text
          title={t('title')}
          subtitle={t('subtitle')}
        >
          {CONTENT.map((type, index) => (
            <Section
              key={index}
              title={t(`${type}.title`)}
              text={t(`${type}.text`)}
            />
          ))}
        </Text>
      </Page>
    )
  }
}

export default withNamespaces('privacy')(Privacy)
