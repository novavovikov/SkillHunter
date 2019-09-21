import React, { Component } from 'react'
import { Layout, Logo } from '../../UI'
import { HeaderMenu, Search } from '../index'
import * as s from './Header.css'

interface Props {
  search: boolean
  userMenu: boolean
}

class Header extends Component<Props> {
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
            <HeaderMenu/>
          </div>
        )}
      </Layout.Header>
    )
  }
}

export default Header
