import React, { Component } from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router'
import { PAGE_VIEW_EVENT } from '../constants/analytics'
import { ROUTES } from '../constants/routing'
import { analytics } from '../utils/analytics'
import PrivateRoute from './privateRoute'

const ToS = React.lazy(() => import('../pages/ToS'))
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

class Routes extends Component<RouteComponentProps> {
  componentDidMount (): void {
    this.props.history.listen(() => {
      analytics({
        event: PAGE_VIEW_EVENT,
        page_url: window.location.href
      })
    })
  }

  render () {
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
            path={`${ROUTES.SKILLSET}/:skillset${ROUTES.SKILL}/:skillId`}
            component={Resources}
            exact
          />

          <PrivateRoute
            path={`${ROUTES.SKILLSET}/:skillset`}
            component={Skillset}
            exact
          />

          <PrivateRoute
            path={ROUTES.SKILLSET}
            component={Skillset}
          />

          <PrivateRoute
            path={`${ROUTES.EVALUATION}/:skillset`}
            component={() => <Mock title="Evaluation is coming soon"/>}
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

          <PrivateRoute
            path={'*'}
            component={NotFound}
          />
        </Switch>
      </React.Suspense>
    )
  }
}

export default withRouter(Routes)
