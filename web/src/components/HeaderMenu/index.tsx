import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { IconTypes } from '../../types'
import { Icon, Item, Menu } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './HeaderMenu.css'
import { HelpToStart } from '../index'
import { RouteComponentProps, withRouter } from 'react-router'
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

class HeaderMenu extends React.Component<Props, State> {
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

  render () {
    const { helpVisibility } = this.state
    const { user } = this.props

    if (!user) {
      return null
    }

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
}

export default compose(
  withRouter,
  connect(
    ({ user }: RootState) => ({ user }),
  ),
)(HeaderMenu)
