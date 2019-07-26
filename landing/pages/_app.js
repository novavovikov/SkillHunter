import React from 'react'
import TagManager from 'react-gtm-module'
import App, { Container } from 'next/app'

class MyApp extends App {
  componentDidMount () {
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
