import React, { Component } from 'react'
import cn from 'classnames'
import * as s from './MobileMenu.css'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'

interface Props {
  user: UserState,
}

const MOBILE_MENU = [
  {
    type: 'home',
  },
  {
    type: 'search',
  },
  {
    type: 'add',
  },
  {
    type: 'library',
  },
  {
    type: 'profile',
  },
]

class MobileMenu extends Component<Props> {
  render () {
    const { user } = this.props

    return (
      <div className={s.MobileMenu}>
        {MOBILE_MENU.map(({ type }) => {
          if (user && type === 'profile') {
            return (
              <button
                key={type}
                className={cn(s.MobileMenu__control, s.MobileMenu__control_profile)}
              >
                <span className={s.MobileMenu__avatar}>
                  <img
                    src={user.picture}
                    alt=""
                  />
                </span>
              </button>
            )
          }

          return (
            <button
              key={type}
              className={cn(s.MobileMenu__control, {
                [s.MobileMenu__control_home]: type === 'home',
                [s.MobileMenu__control_search]: type === 'search',
                [s.MobileMenu__control_add]: type === 'add',
                [s.MobileMenu__control_library]: type === 'library',
              })}
            />
          )
        })}
      </div>
    )
  }
}

export default compose(
  connect(
    ({ user }: RootState) => ({ user }),
  ),
)(MobileMenu)
