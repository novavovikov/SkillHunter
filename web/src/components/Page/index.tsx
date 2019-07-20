import cn from 'classnames'
import React, { Component } from 'react'
import { Layout } from '../../UI'
import { Footer, Header, Sidebar } from '../index'
import * as s from './Page.css'

interface Props {
  sidebar: boolean
  search: boolean
  userMenu: boolean
}

interface State {
  sidebarVisibility: boolean
}

class Page extends Component<Props, State> {
  static defaultProps = {
    sidebar: true,
    search: true,
    userMenu: true,
  }

  state = {
    sidebarVisibility: false,
  }

  render () {
    const { children, sidebar, search, userMenu } = this.props
    const { sidebarVisibility } = this.state

    return (
      <Layout.Wrap>
        <Header
          search={search}
          userMenu={userMenu}
        />

        <Layout.Main>
          {sidebar && (
            <>
              <button
                className={s.Page__switcher}
                onClick={() => this.setState({ sidebarVisibility: !sidebarVisibility })}
              />
              <Sidebar className={cn(s.Page__sidebar, {
                [s.Page__sidebar_opened]: sidebarVisibility,
              })}/>
            </>
          )}

          <Layout.Content
            className={cn({
              [s.Page_withSidebar]: sidebar,
            })}
          >
            {children}
          </Layout.Content>
        </Layout.Main>

        <Footer/>
      </Layout.Wrap>
    )
  }
}

export default Page
