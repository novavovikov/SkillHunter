import * as React from 'react'
import { Route, Switch } from 'react-router'
import { ROUTES } from '../constants/routing'
import PrivateRoute from './privateRoute'

const Auth = React.lazy(() => import('../pages/Auth'))
const Home = React.lazy(() => import('../pages/Home'))
const Settings = React.lazy(() => import('../pages/Settings'))
const Logout = React.lazy(() => import('../pages/Logout'))
const Introduction = React.lazy(() => import('../pages/Introduction'))
const Library = React.lazy(() => import('../pages/Library'))
const NotFound = React.lazy(() => import('../pages/NotFound'))

const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Загрузка</div>}>
      <Switch>
        <Route
          path={ROUTES.AUTH}
          component={Auth}
          exact
        />

        <PrivateRoute
          path={ROUTES.HOME}
          component={Home}
          exact
        />

        <PrivateRoute
          path={ROUTES.SETTINGS}
          component={Settings}
          exact
        />

        <PrivateRoute
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
