import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { ajax } from '../../utils/ajax'
import * as s from './UserProfessions.css'

interface Profession {
  id: number
  name: string
  created: string
  accepted: boolean
}

interface Props {

}

interface State {
  professions: Profession[]
}

class UserProfessions extends React.Component<Props, State> {
  state = {
    professions: []
  }

  componentDidMount (): void {
    ajax.get('user/professions').
      then(resp => {
        this.setState({
          professions: resp.data
        })
      })
  }

  render () {
    const { professions } = this.state

    return (
      <div className={s.UserProfessions}>
        {professions.map(({ id, name }) => (
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

export default UserProfessions
