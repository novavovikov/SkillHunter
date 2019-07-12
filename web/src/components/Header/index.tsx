import React from 'react'
import { HeaderMenu, Search } from '../index'
import * as s from './Header.css'

const Header = () => {
  return (
    <header className={s.Header}>
      <Search/>

      <div className={s.Header__section}>
        <HeaderMenu/>
      </div>
    </header>
  )
}

export default Header
