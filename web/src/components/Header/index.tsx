import React from 'react'
import { Logo } from '../../UI'
import { HeaderMenu, Search } from '../index'
import * as s from './Header.css'

const Header = () => {
  return (
    <header className={s.Header}>
      <div className={s.Header__logo}>
        <Logo/>
      </div>

      <Search/>

      <div className={s.Header__section}>
        <HeaderMenu/>
      </div>
    </header>
  )
}

export default Header
