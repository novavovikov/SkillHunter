import React, { FC } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import * as s from './Nav.css'

const CONTROLS = [
  {
    label: 'Skillset',
    to: ROUTES.SKILLSET,
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

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
}

const Nav: FC<Props> = ({ match }) => {
  const postfix = match.params.skillset ? `/${match.params.skillset}` : ''

  return (
    <nav className={s.Nav}>
      {CONTROLS.map(({ label, to }) => (
        <NavLink
          key={to}
          to={`${to}${postfix}`}
          className={s.Nav__item}
          activeClassName={s.Nav__item_active}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default withRouter(Nav)
