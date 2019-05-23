import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { ROUTES } from '../constants/routing'
import withUser from '../hoc/userHOC'
import { UserState } from '../redux/reducers/user'

interface Props extends RouteProps {
  user: UserState,
}

class PrivateRoute extends React.Component<Props> {
  render () {
    const { user, ...rest } = this.props

    if (user.isLoading) {
      return null
    }

    if (user.data) {
      return <Route {...rest}/>
    }

    return <Redirect to={ROUTES.LOGIN}/>
  }
}

export default withUser(PrivateRoute)

