import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { ROUTES } from '../constants/routing'
import { withUser } from '../providers/User'
import { UserState } from '../redux/reducers/user'
import { getToken } from '../utils/token'

interface Props extends RouteProps {
  user: UserState,
}

class PrivateRoute extends React.Component<Props> {
  render () {
    const { user, ...rest } = this.props
    const token = getToken()

    if (!token || !user) {
      return <Redirect to={`${ROUTES.LOGIN}?backUrl=${window.location.href}`}/>
    }

    return <Route {...rest}/>
  }
}

export default withUser(PrivateRoute)
