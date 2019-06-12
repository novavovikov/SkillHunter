import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import * as s from './Nav.css'

const CONTROLS = [
  {
    label: 'Library',
    to: ROUTES.LIBRARY,
  },
  {
    label: 'Evaluation',
    to: ROUTES.EVALUATION,
  },
  {
    label: 'Plan',
    to: ROUTES.PLAN,
  },
]

const Nav: React.FC = () => {
  return (
    <nav className={s.Nav}>
      {CONTROLS.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          className={s.Nav__item}
          activeClassName={s.Nav__item_active}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Nav
