import React from 'react'
import { Route, Switch } from 'react-router'
import { FeatureController, Layout } from '../components'
import { RoleType } from '../constants/role-type'
import { ROUTES } from '../constants/routing'

import NotFound from '../pages/NotFound'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import User from '../pages/User'
import Subscribers from '../pages/Subscribers'
import Professions from '../pages/Professions'
import Skills from '../pages/Skills'
import Resources from '../pages/Resources'

const Routes: React.FC = () => {
  return (
    <FeatureController
      roles={[RoleType.Admin]}
      ReplacementComponent={NotFound}
    >
      <Layout>
        <Switch>
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
            path={`${ROUTES.USERS}/:userId`}
            component={User}
            exact
          />

          <Route
            path={ROUTES.SKILLSETS}
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
            path={ROUTES.HOME}
            component={Dashboard}
            exact
          />

          <Route
            path={'*'}
            component={NotFound}
          />
        </Switch>
      </Layout>
    </FeatureController>
  )
}

export {
  Routes,
}
