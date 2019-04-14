import React from 'react'
import { withNamespaces } from '../i18n'
import Page from '../components/Page'
import Block from '../components/Block'

class MainPage extends React.Component {
  static async getInitialProps () {
    return {
      namespacesRequired: ['main']
    }
  }

  render () {
    const { t } = this.props

    return (
      <Page
        banner
        promo
      >
        <Block
          img="undraw_bookmarks_r6u.png"
          title={t('block-title-1')}
          text={t('block-text-1')}
        />

        <Block
          theme="reverse"
          img="undraw_buffer_wq43.png"
          title={t('block-title-2')}
          text={t('block-text-2')}
        />

        <Block
          img="undraw_accept_reques.png"
          title={t('block-title-3')}
          text={t('block-text-3')}
        />
      </Page>
    )
  }
}

export default withNamespaces('main')(MainPage)
