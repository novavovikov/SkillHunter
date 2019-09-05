import React, { FC } from 'react'
import { Button, Layout, Logo } from '../../UI'
import { HeaderMenu, Search } from '../index'
import * as s from './Header.css'

interface Props {
  search: boolean
  userMenu: boolean
}

const Header: FC<Props> = ({ search, userMenu }) => {
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
          >
            Become a Patron
          </a>
          <HeaderMenu/>
        </div>
      )}
    </Layout.Header>
  )
}

export default Header
