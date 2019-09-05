import cn from 'classnames'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { getUserDataSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { H2, H4, Logo, Tip } from '../../UI'
import { analytics } from '../../utils/analytics'
import { getToken } from '../../utils/token'
import { LOGIN_BACK_URL_STORAGE_KEY } from '../../constants/login'
import * as s from './Login.css'

interface Props extends RouteComponentProps {
  user: UserState,
  getUser: () => void
}

class Login extends React.Component<Props> {
  componentDidMount (): void {
    const { getUser, user, location } = this.props
    const backUrl = new URLSearchParams(location.search).get('backUrl')
    const token = getToken()

    if (backUrl) {
      sessionStorage.setItem(LOGIN_BACK_URL_STORAGE_KEY, backUrl)
    }

    if (
      token &&
      !user
    ) {
      getUser()
    }
  }

  render () {
    const { user } = this.props
    const token = getToken()

    if (token && user) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <div className={s.Login}>
        <Logo className={s.Login__logo}/>

        <H2 className={s.Login__title}>
          Sign in or sign up
        </H2>

        <div className={s.Login__label}>
          with
        </div>

        <a
          className={cn(s.Login__btn, s.Login__btn_google)}
          href={`${API.BASE_URL}${API.AUTH_GOOGLE}`}
          onClick={() => {
            analytics({
              event: 'click_authorize',
              auth_system: 'google',
              category: 'registration'
            })
          }}
        >
          GOOGLE
        </a>

        <div className={s.Login__label}>
          or
        </div>

        <a
          className={cn(s.Login__btn, s.Login__btn_fb)}
          href={`${API.BASE_URL}${API.AUTH_FACEBOOK}`}
          onClick={() => {
            analytics({
              event: 'click_authorize',
              auth_system: 'facebook',
              category: 'registration'
            })
          }}
        >
          FACEBOOK
        </a>

        <div className={s.Login__terms}>
          By registering, you agree with our<br/>
          <Link to={ROUTES.TOS} target={'_blank'} className={s.Login__link}>Terms of
            Service</Link> and <a href={'https://skillhunter.io/static/files/privacy_policy_en.pdf'} target={'_blank'}
                                  className={s.Login__link}>Privacy
          Policy.</a>
        </div>

        <Tip
          icon={'lock'}
          className={s.Login__security}
        >
          We do not pass on information to third parties. You can always close access to your account.
        </Tip>

        <div className={s.Login__footer}>
          <H4 className={s.Login__title}>
            Don't have a Google or a Facebook Account?
          </H4>
          <div className={s.Login__description}>
            No problem! You can create a Google or a Facebook Account with any email address.
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(
    ({ user }: RootState) => ({ user }),
    {
      getUser: getUserDataSaga,
    },
  ),
)(Login)
