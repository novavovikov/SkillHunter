import cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { ROUTES } from '../constants/routing'
import { getUserData } from '../redux/actions/user'
import { UserState } from '../redux/reducers/user'

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
        return <Redirect to={ROUTES.LOGIN}/>
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
