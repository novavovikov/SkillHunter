import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { PAGE_VIEW_EVENT } from '../../constants/analytics'
import { RootState } from '../../redux/reducers'
import { IUser } from '../../types'
import { analytics } from '../../utils/analytics'

interface Props extends RouteComponentProps {
  userData: IUser
}

class Analytics extends Component<Props> {
  componentDidMount (): void {
    this.sendAnalyticEvent()

    this.props.history.listen(() => {
      analytics({
        event: PAGE_VIEW_EVENT,
        page_url: window.location.href
      })
    })
  }

  componentDidUpdate ({ userData }: Readonly<Props>): void {
    if (userData !== this.props.userData) {
      this.sendAnalyticEvent()
    }
  }

  sendAnalyticEvent = () => {
    const { userData } = this.props

    if (userData) {
      analytics({
        event: PAGE_VIEW_EVENT,
        userId: userData.id,
        userCreated: userData.created,
        userName: userData.name,
        locale: userData.locale,
        role: userData.role
      })
    }
  }

  render () {
    return null
  }
}

export default compose(
  withRouter,
  connect(
    ({ user }: RootState) => ({
      userData: user,
    }),
  )
)(Analytics)
