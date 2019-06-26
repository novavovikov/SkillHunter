import * as React from 'react'
import { Layout, Logo } from '../../UI'
import HeaderMenu from '../HeaderMenu'
import * as s from './Header.css'

const Header = () => {
  return (
    <header className={s.Header}>
      <Layout.Container>
        <div className={s.Header__content}>
          <div className={s.Header__section}>
            <HeaderMenu/>
          </div>
        </div>
      </Layout.Container>
    </header>
  )
}

export default Header
