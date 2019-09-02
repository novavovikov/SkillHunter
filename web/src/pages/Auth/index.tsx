import React, { Component } from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import cn from 'classnames'
import { Page } from '../../components'
import { ROUTES } from '../../constants/routing'
import * as s from './Auth.css'
import { Loader } from '../../UI'
import { ajax } from '../../utils/ajax'

enum MessageTypes {
  'simple',
  'success',
  'error'
}

interface State {
  token: string | null
  message: {
    type: MessageTypes,
    text: string | null
  }
}

class Auth extends Component<RouteComponentProps, State> {
  get token () {
    const { location } = this.props

    return new URLSearchParams(location.search).get('token')
  }

  state = {
    token: this.token,
    message: {
      type: MessageTypes.simple,
      text: null,
    },
  }

  componentDidMount (): void {
    const { token } = this.state

    if (token) {
      this.auth(token)
    }
  }

  auth (token: string) {
    ajax.
      get(`/telegram/auth/${token}`).
      then(({ data }) => {
        this.setState({
          message: {
            type: MessageTypes.success,
            text: 'You can close this tab',
          },
        })

        window.location.href = `tg://user?id=${data}`
      }).
      catch(err => {
        const text = (err.response && err.response.status < 500)
          ? err.response.data.message
          : 'System error.\nTry again.'

        this.setState({
          message: {
            type: MessageTypes.error,
            text,
          },
        })
      })
  }

  render () {
    const { token, message } = this.state

    if (!token) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <Page
        sidebar={false}
        search={false}
      >
        <div className={s.Auth}>
          {!message.text && <Loader size="s"/>}

          <div className={cn(s.Auth__text, {
            [s.Auth__text_simple]: message.type === MessageTypes.simple,
            [s.Auth__text_error]: message.type === MessageTypes.error,
            [s.Auth__text_success]: message.type === MessageTypes.success,
          })}>
            {message.text || 'Login to SkillHunter'}
          </div>
        </div>
      </Page>
    )
  }
}

export default withRouter(Auth)
