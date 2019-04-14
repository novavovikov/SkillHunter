import React from 'react'
import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Final from '../components/Final'

class FinalPage extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['final']
    }
  }

  render () {
    const { t } = this.props

    return (
      <Page
        recommendation
        head={{
          title: t('title.thanks')
        }}
        header={{
          withRegistration: false,
        }}
      >
        <Final/>
      </Page>
    )
  }
}

export default withNamespaces('common')(FinalPage)
