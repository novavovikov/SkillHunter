import React, { FC } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { UserState } from '../../redux/reducers/user'
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

interface Params {
  profession: string
}

interface Props extends RouteComponentProps<Params> {
}

const Nav: FC<Props> = ({ match }) => {
  const postfix = match.params.profession ? `/${match.params.profession}` : ''

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
