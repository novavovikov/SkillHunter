import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { IUser } from '../../types'
import { analytics } from '../../utils/analytics'

interface Props {
  userData: IUser
}

class Analytics extends Component<Props> {
  componentDidMount (): void {
    this.sendAnalyticEvent()
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
        event: 'page view',
        userId: userData.id,
        locale: userData.locale,
        role: userData.role
      })
    }
  }

  render () {
    return null
  }
}

export default connect(
  ({ user }: RootState) => ({
    userData: user.data,
  }),
)(Analytics)
