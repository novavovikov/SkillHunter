import * as React from 'react'
import { Route, Switch } from 'react-router'
import { FeatureController, Layout } from '../components'
import { RoleType } from '../constants/role-type'
import { ROUTES } from '../constants/routing'

const NotFound = React.lazy(() => import('../containers/NotFound'))
const Dashboard = React.lazy(() => import('../containers/Dashboard'))
const Users = React.lazy(() => import('../containers/Users'))
const Subscribers = React.lazy(() => import('../containers/Subscribers'))
const Professions = React.lazy(() => import('../containers/Professions'))
const Skills = React.lazy(() => import('../containers/Skills'))
const Resources = React.lazy(() => import('../containers/Resources'))

const Routes: React.FC = () => {
  return (
    <FeatureController
      roles={[RoleType.Admin]}
      ReplacementComponent={NotFound}
    >
      <Layout>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              path={ROUTES.HOME}
              component={Dashboard}
              exact
            />

            <Route
              path={ROUTES.SUBSCRIBERS}
              component={Subscribers}
              exact
            />

            <Route
              path={ROUTES.USERS}
              component={Users}
              exact
            />

            <Route
              path={ROUTES.PROFESSIONS}
              component={Professions}
              exact
            />

            <Route
              path={ROUTES.SKILLS}
              component={Skills}
              exact
            />

            <Route
              path={ROUTES.RESOURCES}
              component={Resources}
              exact
            />

            <Route
              path={'*'}
              component={NotFound}
            />
          </Switch>
        </React.Suspense>
      </Layout>
    </FeatureController>
  )
}

export {
  Routes,
}
