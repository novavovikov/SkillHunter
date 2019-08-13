import cn from 'classnames'
import React, { Component } from 'react'
import { IconTypes } from '../../types'
import { Icon, Layout } from '../../UI'
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

  toggleSidebar = () => {
    const { sidebarVisibility } = this.state

    this.setState({
      sidebarVisibility: !sidebarVisibility,
    })
  }

  closeSidebar = () => {
    this.setState({
      sidebarVisibility: false
    })
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
                className={cn(s.Page__switcher, {
                  [s.Page__switcher_active]: sidebarVisibility
                })}
                onClick={this.toggleSidebar}
              >
                <Icon
                  type={IconTypes.dots}
                  size="24"
                />
              </button>
              <Sidebar
                className={cn(s.Page__sidebar, {
                  [s.Page__sidebar_opened]: sidebarVisibility,
                })}
                onClose={this.closeSidebar}
              />
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
