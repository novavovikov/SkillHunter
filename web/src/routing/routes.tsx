import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { ROUTES } from '../constants/routing'
import PrivateRoute from './privateRoute'

const Auth = React.lazy(() => import('../pages/Auth'))
const Settings = React.lazy(() => import('../pages/Settings'))
const Logout = React.lazy(() => import('../pages/Logout'))
const Introduction = React.lazy(() => import('../pages/Introduction'))
const NotFound = React.lazy(() => import('../pages/NotFound'))
const Library = React.lazy(() => import('../pages/Library'))

const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Загрузка</div>}>
      <Switch>
        <Redirect
          from={ROUTES.HOME}
          to={ROUTES.LIBRARY}
          exact
        />

        <Route
          path={ROUTES.AUTH}
          component={Auth}
          exact
        />

        <Route
          path={ROUTES.SETTINGS}
          component={Settings}
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
          path={`${ROUTES.LIBRARY}/:profession`}
          component={Library}
        />

        <PrivateRoute
          path={ROUTES.LIBRARY}
          component={Library}
          exact
        />

        <PrivateRoute
          path={ROUTES.EVALUATION}
          component={Library}
          exact
        />

        <PrivateRoute
          path={ROUTES.PLAN}
          component={Library}
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
