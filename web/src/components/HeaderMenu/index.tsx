import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { ROUTES } from '../../constants/routing'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { IconTypes } from '../../types'
import { Animation, Icon, OutsideClickWrapper } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './HeaderMenu.css'

const MENU = [
  // {
  //   label: 'Account settings',
  //   to: ROUTES.SETTINGS,
  // },
  {
    label: 'Logout',
    to: ROUTES.LOGOUT,
  },
]

interface Props {
  user: UserState,
}

interface State {
  isOpen: boolean,
}

class HeaderMenu extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  closeMenu = () => {
    this.setState({
      isOpen: false,
    })
  }

  handleButton = () => {
    const { isOpen } = this.state

    this.setState({
      isOpen: !isOpen
    })

    if (!isOpen) {
      analytics({
        event: 'click_user_menu',
        category: 'user_menu'
      })
    }
  }

  handleMenuLink = () => {
    this.closeMenu()

    analytics({
      event: 'click_logout',
      category: 'user_menu'
    })
  }

  render () {
    const { isOpen } = this.state
    const { user } = this.props

    if (!user.data) {
      return null
    }

    return (
      <OutsideClickWrapper
        className={s.HeaderMenu}
        handler={this.closeMenu}
      >
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

          <Icon
            type={isOpen ? IconTypes.arrowUp : IconTypes.arrowDown}
            size="24"
          />
        </button>

        <Animation.Dropdown in={isOpen}>
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
        </Animation.Dropdown>
      </OutsideClickWrapper>
    )
  }
}

export default compose(
  connect(
    ({ user }: RootState) => ({ user }),
  ),
)(HeaderMenu)
