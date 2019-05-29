import * as React from 'react'
import { Route, Switch } from 'react-router'
import { RoleType } from '../constants/role-type'
import { ROUTES } from '../constants/routing'
import PrivateRoute from './privateRoute'
import { FeatureController } from '../components'

const Auth = React.lazy(() => import('../containers/Auth'))
const Logout = React.lazy(() => import('../containers/Logout'))
const Home = React.lazy(() => import('../containers/Home'))
const Introduction = React.lazy(() => import('../containers/Introduction'))
const NotFound = React.lazy(() => import('../containers/NotFound'))

const Routes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Загрузка</div>}>
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

        <FeatureController
          roles={[RoleType.Admin]}
          path={ROUTES.HOME}
        >
          <Home/>
        </FeatureController>

        <PrivateRoute
          path={'*'}
          component={NotFound}
        />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
