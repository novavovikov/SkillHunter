import React from 'react'
import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Container from '../components/Container'
import Registration from '../components/Registration'

class RegistrationPage extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['registration']
    }
  }

  render () {
    const { t } = this.props

    return  (
      <Page
        header={{ withRegistration: false }}
        head={{
          title: t('title.registration')
        }}
      >
        <Container>
          <Registration/>
        </Container>
      </Page>
    )
  }
}

export default withNamespaces('common')(RegistrationPage)
