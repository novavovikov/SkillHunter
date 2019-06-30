import React, { FC } from 'react'
import { Route, Switch } from 'react-router'
import { ROUTES } from '../constants/routing'
import PrivateRoute from './privateRoute'

const Share = React.lazy(() => import('../pages/Share'))
const Auth = React.lazy(() => import('../pages/Auth'))
const Home = React.lazy(() => import('../pages/Home'))
const Settings = React.lazy(() => import('../pages/Settings'))
const Logout = React.lazy(() => import('../pages/Logout'))
const Introduction = React.lazy(() => import('../pages/Introduction'))
const Library = React.lazy(() => import('../pages/Library'))
const NotFound = React.lazy(() => import('../pages/NotFound'))

const Routes: FC = () => {
  return (
    <React.Suspense fallback={<div>Загрузка</div>}>
      <Switch>
        <Route
          path={ROUTES.AUTH}
          component={Auth}
          exact
        />

        <Route
          path={ROUTES.SHARE}
          component={Share}
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
          path={`${ROUTES.SKILLSET}/:skillset`}
          component={Library}
        />

        <PrivateRoute
          path={ROUTES.SKILLSET}
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
