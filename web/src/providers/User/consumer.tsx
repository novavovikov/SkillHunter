import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { ROUTES } from '../../constants/routing'
import { getUserDataSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { getToken } from '../../utils/token'

export const withUser = (WrappedComponent: React.ComponentType) => {
  class Component extends React.Component<any> {
    static displayName = WrappedComponent.name || 'WrappedUserComponent'

    get token () {
      return getToken()
    }

    componentDidMount (): void {
      const { user, getUser } = this.props

      if (
        this.token &&
        !user
      ) {
        getUser()
      }
    }

    render () {
      if (!this.token) {
        return <Redirect to={`${ROUTES.LOGIN}?backUrl=${window.location.href}`}/>
      }

      const { user } = this.props

      if (user) {
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
