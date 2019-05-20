import React from 'react'
import Head from 'next/head'
import { withNamespaces } from '../../i18n'
import '../../styles/global.scss'

class HeadLayout extends React.Component {
  render () {
    const {
      title,
      t,
    } = this.props

    return (
      <Head>
        <meta charSet="utf-8"/>
        <title>
          {title || t('title.main')}
        </title>
      </Head>
    )
  }
}

export default withNamespaces('common')(HeadLayout)
