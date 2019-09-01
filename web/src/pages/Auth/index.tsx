import React, { Component } from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Page } from '../../components'
import { ROUTES } from '../../constants/routing'
import * as s from './Auth.css'

interface State {
  token: string | null
}

class Auth extends Component<RouteComponentProps, State> {
  get token () {
    const { location } = this.props

    return new URLSearchParams(location.search).get('token')
  }

  state = {
    token: this.token,
  }

  render () {
    const { token } = this.state

    if (!token) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <Page
        sidebar={false}
        search={false}
      >
        <div className={s.Auth}>
          Login to SkillHunter
        </div>
      </Page>
    )
  }
}

export default withRouter(Auth)
