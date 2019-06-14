import * as React from 'react'
import withClickOutside from 'react-click-outside'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import withUser from '../../HOC/userHOC'
import { UserState } from '../../redux/reducers/user'
import * as s from './HeaderMenu.css'

interface Props {
  user: UserState
}

interface State {
  isOpen: boolean,
}

class HeaderMenu extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  handleClickOutside () {
    this.setState({
      isOpen: false,
    })
  }

  handleButton = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    const { isOpen } = this.state
    const { user } = this.props

    if (!user.data) {
      return null
    }

    return (
      <div className={s.HeaderMenu}>
        <button
          className={s.HeaderMenu__info}
          onClick={this.handleButton}
        >
        <span className={s.HeaderMenu__avatar}>
          {user.data.picture && (
            <img
              src={user.data.picture}
              alt=""
            />
          )}
        </span>

          {user.data.name && <span className={s.HeaderMenu__name}>{user.data.name}</span>}
        </button>

        {isOpen && (
          <div className={s.HeaderMenu__list}>
            <Link
              to={ROUTES.LOGOUT}
              className={s.HeaderMenu__item}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default withUser(withClickOutside(HeaderMenu))
