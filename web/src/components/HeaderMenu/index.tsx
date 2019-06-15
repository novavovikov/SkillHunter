import * as React from 'react'
import withClickOutside from 'react-click-outside'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { ROUTES } from '../../constants/routing'
import { withNotification } from '../../providers/Notification'
import { NotificationContextInterface } from '../../providers/Notification/context'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import * as s from './HeaderMenu.css'

let count = 0

const MENU = [
  {
    label: 'Account settings',
    to: ROUTES.SETTINGS,
  },
  {
    label: 'Logout',
    to: ROUTES.LOGOUT,
  },
]

interface Props {
  user: UserState,
  notificationApi: NotificationContextInterface
}

interface State {
  isOpen: boolean,
}

class HeaderMenu extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  handleClickOutside () {
    this.closeMenu()
  }

  closeMenu = () => {
    this.setState({
      isOpen: false,
    })
  }

  handleButton = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  handleMenuLink = (e: any) => {
    count++
    this.props.notificationApi.showNotification({
      type: 'error',
      message: `Сообщение #${count}\n Вы перешли на страницу ${e.target.innerText}`,
    })

    this.closeMenu()
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
            {MENU.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={s.HeaderMenu__item}
                onClick={this.handleMenuLink}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default compose(
  withUser,
  withNotification,
)(withClickOutside(HeaderMenu))
