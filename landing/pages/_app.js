import React from 'react'
import App, { Container } from 'next/app'
import TagManager from 'react-gtm-module'

class MyApp extends App {
  componentWillMount () {
    TagManager.initialize({
      gtmId: 'GTM-K4FPF86',
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
