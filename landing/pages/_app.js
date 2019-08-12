import React from 'react'
import cookies from 'js-cookie'
import TagManager from 'react-gtm-module'
import App, { Container } from 'next/app'
import { AGREEMENT_ROUTE, APP_ROUTE, COOKIE_ROUTE } from '../constants/routes'

class MyApp extends App {
  state = {
    isLoading: true
  }

  componentDidMount () {
    if ((
      !window.location.pathname.includes(AGREEMENT_ROUTE) ||
      !window.location.pathname.includes(COOKIE_ROUTE)
    ) && cookies.get('authToken')) {
      return window.location.href = APP_ROUTE
    }

    TagManager.initialize({
      gtmId: 'GTM-K4FPF86',
    })

    this.setState({
      isLoading: false
    })
  }

  render() {
    if (this.state.isLoading) {
      return null
    }

    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
