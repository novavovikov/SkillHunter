import React from 'react'
import cn from 'classnames'
import { MenuItem } from '../'
import { MENU } from '../../constants/routing'
import * as s from './Layout.css'

const Layout: React.FC = ({ children }) => {
  const [isOpen, setOpenStatus] = React.useState(false)
  const handleSwitcher = () => {
    setOpenStatus(!isOpen)
  }

  return (
    <div className={s.Layout}>
      <button
        className={cn(s.Layout__switcher, {
          [s.Layout__switcher_opened]: isOpen
        })}
        onClick={handleSwitcher}
      />

      <div className={cn(s.Layout__sidebar, {
        [s.Layout__sidebar_opened]: isOpen
      })}>
        {MENU.map(({ label, to, exact }, index) => (
          <MenuItem
            key={index}
            to={to}
            exact={exact}
          >
            {label}
          </MenuItem>
        ))}
      </div>
      <div className={cn(s.Layout__content, {
        [s.Layout__content_opened]: isOpen
      })}>
        {children}
      </div>
    </div>
  )
}

export default Layout
