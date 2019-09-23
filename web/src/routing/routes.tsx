import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {  Route, Switch } from 'react-router'
import { ROUTES } from '../constants/routing'
import { RootState } from '../redux/reducers'
import PrivateRoute from './privateRoute'
import UpdatePage from '../pages/UpdatePage'

const ToS = React.lazy(() => import('../pages/ToS'))
const Landing = React.lazy(() => import('../pages/Landing'))
const Cookie = React.lazy(() => import('../pages/Cookie'))
const Login = React.lazy(() => import('../pages/Login'))
const Share = React.lazy(() => import('../pages/Share'))
const Auth = React.lazy(() => import('../pages/Auth'))
const Home = React.lazy(() => import('../pages/Home'))
const Settings = React.lazy(() => import('../pages/Settings'))
const Logout = React.lazy(() => import('../pages/Logout'))
const Introduction = React.lazy(() => import('../pages/Introduction'))
const Skillset = React.lazy(() => import('../pages/Skillset'))
const Resource = React.lazy(() => import('../pages/Resource'))
const Resources = React.lazy(() => import('../pages/Resources'))
const Mock = React.lazy(() => import('../pages/Mock'))
const NotFound = React.lazy(() => import('../pages/NotFound'))

interface Props {
  statusCode: number
}

class Routes extends Component<Props> {
  render () {
    const { statusCode } = this.props

    if (statusCode >= 500) {
      return <UpdatePage/>
    }

    return (
      <React.Suspense fallback={<div>Загрузка</div>}>
        <Switch>
          <Route
            path={ROUTES.TOS}
            component={ToS}
            exact
          />

          <Route
            path={ROUTES.COOKIE}
            component={Cookie}
            exact
          />

          <Route
            path={ROUTES.LANDING}
            component={Landing}
            exact
          />

          <Route
            path={ROUTES.LOGIN}
            component={Login}
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
            path={ROUTES.AUTH}
            component={Auth}
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
            path={`${ROUTES.LIBRARY}/:skillset${ROUTES.SKILL}/:skillId`}
            component={Resources}
            exact
          />

          <PrivateRoute
            path={`${ROUTES.LIBRARY}/:skillset`}
            component={Skillset}
            exact
          />

          <PrivateRoute
            path={ROUTES.LIBRARY}
            component={Skillset}
          />

          <PrivateRoute
            path={`${ROUTES.PLAN}/:skillset`}
            component={() => <Mock title="Plan is coming soon"/>}
          />

          <Route
            path={`${ROUTES.RESOURCE}/:userResourceId`}
            component={Resource}
            exact
          />

          <PrivateRoute component={NotFound}/>
        </Switch>
      </React.Suspense>
    )
  }
}

export default compose(
  connect(
    ({ app }: RootState) => ({
      statusCode: app.statusCode
    }),
  ),
)(Routes)
