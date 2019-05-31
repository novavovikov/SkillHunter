import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import * as s from './MenuItem.css'

const MenuItem: React.FC<NavLinkProps> = ({ children, ...otherProps }) => {
  return (
    <NavLink
      className={s.MenuItem}
      activeClassName={s.MenuItem_active}
      {...otherProps}
    >
      {children}
    </NavLink>
  )
}

export default MenuItem
