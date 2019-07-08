import cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { ROUTES } from '../../constants/routing'
import { getUserDataSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'

export const withUser = (WrappedComponent: React.ComponentType) => {
  class Component extends React.Component<any> {
    static displayName = WrappedComponent.name || 'WrappedUserComponent'

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
        return <Redirect to={ROUTES.AUTH}/>
      }

      const { user } = this.props

      if (user.data) {
        return <WrappedComponent {...this.props}/>
      }

      return null
    }
  }

  return connect(
    ({ user }: RootState) => ({ user }),
    { getUser: getUserDataSaga },
  )(Component)
}
