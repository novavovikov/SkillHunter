import React, { Component } from 'react'
import { Banner, Footer, Header } from '../../components'
import { Head, Layout } from '../../UI'

class Landing extends Component {
  render () {
    return (
      <Layout.Wrap>
        <Head/>
        <Header search={false}/>

        <Layout.Main>
          <Banner/>
        </Layout.Main>

        <Footer/>
      </Layout.Wrap>
    )
  }
}

export default Landing
