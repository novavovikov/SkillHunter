import React from 'react'
import Head from 'next/head'
import '../../styles/global.scss'

class HeadLayout extends React.Component {
  render () {
    const { title } = this.props

    return (
      <Head>
        <meta charSet="utf-8"/>
        <title>
          {title || 'SkillHunter | The platform for developing professional and personal skills'}
        </title>
      </Head>
    )
  }
}

export default HeadLayout
