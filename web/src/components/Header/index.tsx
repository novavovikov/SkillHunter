import React from 'react'
import { Button } from '../../UI'
import { HeaderMenu, Search } from '../index'
import * as s from './Header.css'

const Header = () => {
  return (
    <header className={s.Header}>
      <Search/>

      <div className={s.Header__section}>
        <Button theme="plus">
          Add source
        </Button>
        <HeaderMenu/>
      </div>
    </header>
  )
}

export default Header
