import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router'
import { ROUTES } from '../constants/routing'
import { getUser } from '../redux/actions/user'
import { UserState } from '../redux/reducers/user'

interface Props extends RouteProps {
  user: UserState,
  getUser: () => void
}

class PrivateRoute extends React.Component<Props> {
  componentDidMount (): void {
    const { getUser, user } = this.props

    if (!user.isAuthenticated) {
      getUser()
    }
  }

  render () {
    const { user, ...rest } = this.props

    if (user.isLoading) {
      return null
    }

    if (user.isAuthenticated) {
      return <Route {...rest}/>
    }

    return <Redirect to={ROUTES.LOGIN}/>
  }
}

export default connect(
  (state: any) => ({
    user: state.user,
  }),
  {
    getUser,
  },
)(PrivateRoute)

