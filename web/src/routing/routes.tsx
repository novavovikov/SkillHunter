import * as React from 'react'
import { Route, Switch } from 'react-router'
import { ROUTES } from '../constants/routing'
import PrivateRoute from './privateRoute'

import NotFound from '../containers/NotFound'
import Home from '../containers/Home'
import Introduction from '../containers/Introduction'
import Auth from '../containers/Auth'
import Logout from '../containers/Logout'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path={ROUTES.LOGIN}
        component={Auth}
        exact
      />

      <Route
        path={ROUTES.LOGOUT}
        component={Logout}
        exact
      />

      <PrivateRoute
        path={ROUTES.INTRODUCTION}
        component={Introduction}
        exact
      />

      <PrivateRoute
        path={ROUTES.HOME}
        component={Home}
      />

      <PrivateRoute
        path={'*'}
        component={NotFound}
      />
    </Switch>
  )
}

export default Routes
