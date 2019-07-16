import cn from 'classnames'
import React, { Component } from 'react'
import { Layout } from '../../UI'
import { Header, Sidebar } from '../index'
import * as s from './Page.css'

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

        {sidebar && <Sidebar/>}

        <Layout.Main
          className={cn({
            [s.Page_withSidebar]: sidebar,
          })}
        >
          <Layout.Content>
            {children}
          </Layout.Content>

          <Layout.Footer>
            Copyright ©2019 SkillHunter
          </Layout.Footer>
        </Layout.Main>
      </Layout.Wrap>
    )
  }
}

export default Page
