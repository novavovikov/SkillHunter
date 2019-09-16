import React, { Component } from 'react'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router'
import cn from 'classnames'
import { IconTypes } from '../../types'
import { Head, Icon, Layout } from '../../UI'
import { Footer, Header, Sidebar } from '../index'
import * as s from './Page.css'
import { SIDEBAR_QUERY } from '../../constants/routing'
import { addParamToQuery, deleteParamFromQuery } from '../../utils/url'

interface Props extends RouteComponentProps {
  sidebar: boolean
  search: boolean
  userMenu: boolean
}

class Page extends Component<Props> {
  static defaultProps = {
    sidebar: true,
    search: true,
    userMenu: true,
  }

  toggleSidebar = () => {
    const { location } = this.props

    new URLSearchParams(location.search)
      .get(SIDEBAR_QUERY.param)
      ? this.closeSidebar()
      : this.openSidebar()
  }

  openSidebar = () => {
    const { location, history } = this.props
    const search = addParamToQuery(
      location.search,
      SIDEBAR_QUERY.param,
      SIDEBAR_QUERY.value,
    )

    history.push({ search })
  }

  closeSidebar = () => {
    const { location, history } = this.props
    const search = deleteParamFromQuery(
      location.search,
      SIDEBAR_QUERY.param,
    )

    history.push({ search })
  }

  render () {
    const {
      children,
      sidebar,
      search,
      userMenu,
      location,
    } = this.props

    const sidebarVisibility = new URLSearchParams(location.search)
      .get(SIDEBAR_QUERY.param)

    return (
      <Layout.Wrap>
        <Head/>

        <Header
          search={search}
          userMenu={userMenu}
        />

        <Layout.Main>
          {sidebar && (
            <>
              <button
                onClick={this.toggleSidebar}
                className={cn(s.Page__switcher, {
                  [s.Page__switcher_active]: sidebarVisibility
                })}
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

export default compose<any>(
  withRouter,
)(Page)
