import React from 'react'
import Head from 'next/head'
import TagManager from 'react-gtm-module'
import '../../styles/global.scss'

class HeadLayout extends React.Component {
  componentDidMount () {
    TagManager.initialize({
        gtmId: 'GTM-K4FPF86',
    })
  }

  render () {
    const {
      title,
    } = this.props

    return (
      <Head>
        <meta charSet="utf-8"/>
        <title>
          {title ||
          'SkillHunter | Платформа для развития профессиональных и личных навыков'}
        </title>
      </Head>
    )
  }
}

export default HeadLayout
