import React from 'react'
import Head from 'next/head'
import '../../styles/global.scss'

class HeadLayout extends React.Component {
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
