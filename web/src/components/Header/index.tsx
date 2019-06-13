import * as React from 'react'
import { ResourceCreator } from '../index'
import { Layout, Logo } from '../../UI'
import HeaderMenu from '../HeaderMenu'
import * as s from './Header.css'

const Header = () => {
  return (
    <header className={s.Header}>
      <Layout.Container>
        <div className={s.Header__content}>
          <Logo/>

          <div className={s.Header__section}>
            <ResourceCreator className={s.Header__creator}/>
            <HeaderMenu/>
          </div>
        </div>
      </Layout.Container>
    </header>
  )
}

export default Header
