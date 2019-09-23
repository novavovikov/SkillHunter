import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { IconTypes } from '../../types'
import { Button, Icon, Item, Menu } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './HeaderMenu.css'
import { HelpToStart } from '../index'
import { ROUTES } from '../../constants/routing'

enum MenuValues {
  help = 'help',
  settings = 'settings',
  logout = 'logout'
}

const MENU = [
  {
    label: 'Help',
    value: MenuValues.help,
  },
  {
    label: 'Settings',
    value: MenuValues.settings,
  },
  {
    label: 'Logout',
    value: MenuValues.logout,
  },
]

interface Props extends RouteComponentProps {
  user: UserState,
}

interface State {
  helpVisibility: boolean
}

class HeaderMenu extends Component<Props, State> {
  state = {
    helpVisibility: false,
  }

  handleMenuItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { history } = this.props
    const { value } = e.target as HTMLButtonElement

    analytics({
      event: `click_${value}`,
      category: 'user_menu'
    })

    switch (value) {
      case MenuValues.help:
        return this.openHelp()
      case MenuValues.settings:
        return history.push(ROUTES.SETTINGS)
      case MenuValues.logout:
        return history.push(ROUTES.LOGOUT)
    }
  }

  openHelp = () => {
    this.setState({
      helpVisibility: true,
    })
  }

  closeHelp = () => {
    this.setState({
      helpVisibility: false,
    })
  }

  handleAuth = () => {
    analytics({
      event: 'click_signup_btn',
      category: 'landing',
    })

    window.location.href = ROUTES.APP
  }

  render () {
    const { helpVisibility } = this.state
    const { user } = this.props

    if (user) {
      return (
        <>
          <Menu
            size="free"
            Component={(props) => (
              <div className={s.HeaderMenu__info}>
                <div className={s.HeaderMenu__avatar}>
                  {user!.picture && (
                    <img
                      src={user!.picture}
                      alt=""
                    />
                  )}
                </div>

                <Icon
                  type={props.isOpen ? IconTypes.arrowUp : IconTypes.arrowDown}
                  size="24"
                />
              </div>
            )}
          >
            {MENU.map(({ value, label }) => (
              <Item
                key={value}
                value={value}
                onClick={this.handleMenuItem}
              >
                {label}
              </Item>
            ))}
          </Menu>

          <HelpToStart
            isOpen={helpVisibility}
            onClose={this.closeHelp}
          />
        </>
      )
    }

    return (
      <>
        <Button
          theme="transparent"
          onClick={this.handleAuth}
          className={s.HeaderMenu__button}
        >
          Sign in
        </Button>

        <Button onClick={this.handleAuth}>
          Sign up
        </Button>
      </>
    )
  }
}

export default compose(
  withRouter,
  connect(
    ({ user }: RootState) => ({ user }),
  ),
)(HeaderMenu)
