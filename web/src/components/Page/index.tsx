import cn from 'classnames'
import React, { Component } from 'react'
import { Layout } from '../../UI'
import { Header, Sidebar } from '../index'
import * as s from './Page.css'

interface Props {
  sidebar: boolean
}

interface State {
  sidebarVisibility: boolean
}

class Page extends Component<Props, State> {
  static defaultProps = {
    sidebar: true
  }

  state = {
    sidebarVisibility: false,
  }

  render () {
    const { children, sidebar } = this.props
    const { sidebarVisibility } = this.state

    return (
      <Layout.Wrap>
        <Header/>

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
