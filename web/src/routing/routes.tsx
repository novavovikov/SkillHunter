import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { ROUTES } from '../constants/routing'
import PrivateRoute from './privateRoute'

const Auth = React.lazy(() => import('../containers/Auth'))
const Logout = React.lazy(() => import('../containers/Logout'))
const Home = React.lazy(() => import('../containers/Home'))
const Introduction = React.lazy(() => import('../containers/Introduction'))
const NotFound = React.lazy(() => import('../containers/NotFound'))
const My = React.lazy(() => import('../containers/My'))

const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Загрузка</div>}>
      <Switch>
        <Redirect
          from={ROUTES.HOME}
          to={ROUTES.MY}
          exact
        />

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
          path={ROUTES.MY}
          component={My}
          exact
        />

        <PrivateRoute
          path={'*'}
          component={NotFound}
        />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
