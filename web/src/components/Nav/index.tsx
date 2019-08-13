import React, { Component, FC } from 'react'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { analytics } from '../../utils/analytics'
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

class Nav extends Component<RouteComponentProps<Params>> {
  handleLink = (label: string) => {
    analytics({
      event: (`click_${label}`).toLowerCase(),
      category: 'left_menu'
    })
  }

  render () {
    const { match } = this.props
    const postfix = match.params.skillset ? `/${match.params.skillset}` : ''

    return (
      <nav className={s.Nav}>
        {CONTROLS.map(({ label, to }) => (
          <NavLink
            key={to}
            to={`${to}${postfix}`}
            className={s.Nav__item}
            activeClassName={s.Nav__item_active}
            onClick={() => this.handleLink(label)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    )
  }
}

export default withRouter(Nav)
