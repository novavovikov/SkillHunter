import cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../redux/actions/user'
import { UserState } from '../redux/reducers/user'
import { redirectToLogin } from '../utils/login'

const withUser = (WrappedComponent: React.ComponentType) => {
  class UserHOC extends React.Component<any> {
    static displayName = WrappedComponent.name || 'UserHOCComponent'

    componentDidMount (): void {
      const { user, getUser } = this.props

      if (
        cookies.get('authToken') &&
        !user.data
      ) {
        getUser()
      }
    }

    render () {
      if (!cookies.get('authToken')) {
        redirectToLogin()
        return null
      }

      const { user } = this.props

      if (user.data) {
        return <WrappedComponent {...this.props}/>
      }

      return null
    }
  }

  return connect(
    (state: {
      user: UserState
    }) => ({
      user: state.user,
    }),
    {
      getUser: getUserData,
    },
  )(UserHOC)
}

export default withUser
