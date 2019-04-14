import React from 'react'
import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Text from '../components/Text'

class Agreement extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['agreement']
    }
  }

  render () {
    const { t } = this.props

    return (
      <Page>
        <Text
          title={t('title')}
          subtitle={t('subtitle')}
          text={t(`description`)}
        />
      </Page>
    )
  }
}

export default withNamespaces('agreement')(Agreement)
