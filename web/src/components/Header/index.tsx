import React, { Component, FC } from 'react'
import { Layout, Logo } from '../../UI'
import { HeaderMenu, Search } from '../index'
import * as s from './Header.css'
import { analytics } from '../../utils/analytics'

interface Props {
  search: boolean
  userMenu: boolean
}

class Header extends Component<Props> {
  sendEvent = () => {
    analytics({
      event: 'click_donate',
    })
  }

  render () {
    const { search, userMenu } = this.props

    return (
      <Layout.Header className={s.Header}>
        <div className={s.Header__logo}>
          <Logo/>
        </div>

        {search && <Search/>}

        {userMenu && (
          <div className={s.Header__section}>
            <a
              href="https://www.patreon.com/sh_official"
              className={s.Header__donate}
              target="_blank"
              onClick={this.sendEvent}
            >
              Become a Patron
            </a>
            <HeaderMenu/>
          </div>
        )}
      </Layout.Header>
    )
  }
}

export default Header
