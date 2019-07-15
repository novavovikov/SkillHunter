import React, { Component } from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { Layout } from '../../UI'
import { Header, Sidebar } from '../index'

interface Props {
  sidebar: boolean
}

class Page extends Component<Props> {
  static defaultProps = {
    sidebar: true
  }

  render () {
    const { children, sidebar } = this.props

    return (
      <Layout.Wrap>
        <Header/>

        <Layout.Content>
          {sidebar && <Sidebar/>}

          <Layout.Main>
            <Scrollbar
              autoHeight
              autoHeightMax="100%"
              autoHide
            >
              <Layout.Data>
                {children}
              </Layout.Data>
            </Scrollbar>

            <Layout.Footer>
              Copyright ©2019 SkillHunter
            </Layout.Footer>
          </Layout.Main>
        </Layout.Content>
      </Layout.Wrap>
    )
  }
}

export default Page
