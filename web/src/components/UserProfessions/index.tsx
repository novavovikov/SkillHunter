import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import withUser from '../../HOC/userHOC'
import { UserState } from '../../redux/reducers/user'
import * as s from './UserProfessions.css'

interface Props {
  user: UserState
}

class UserProfessions extends React.Component<Props> {
  render () {
    const { user } = this.props

    if (!user.data) {
      return null
    }

    return (
      <div className={s.UserProfessions}>
        {user.data.professions.map(({ id, name }) => (
          <NavLink
            key={id}
            className={s.UserProfessions__item}
            activeClassName={s.UserProfessions__item_active}
            to={`${ROUTES.LIBRARY}/${name}`}
          >
            {name}
          </NavLink>
        ))}
      </div>
    )
  }
}

export default withUser(UserProfessions)
