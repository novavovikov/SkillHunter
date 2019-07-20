import cn from 'classnames'
import cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { API } from '../../constants/api'
import { ROUTES } from '../../constants/routing'
import { getUserDataSaga } from '../../redux/actions/user'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { H2, H4, Logo, Tip } from '../../UI'
import * as s from './Auth.css'

interface Props {
  user: UserState,
  getUser: () => void
}

class Auth extends React.Component<Props> {
  componentDidMount (): void {
    const { getUser, user } = this.props
    const token = cookies.get('authToken')

    if (
      token &&
      !user.data
    ) {
      getUser()
    }
  }

  render () {
    const { user } = this.props

    if (user.data) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <div className={s.Auth}>
        <Logo className={s.Auth__logo}/>

        <H2 className={s.Auth__title}>
          Sign in or sign up
        </H2>

        <div className={s.Auth__label}>
          with
        </div>

        <a
          className={cn(s.Auth__btn, s.Auth__btn_google)}
          href={`${API.BASE_URL}${API.AUTH_GOOGLE}`}
        >
          GOOGLE
        </a>

        <div className={s.Auth__label}>
          or
        </div>

        <a
          className={cn(s.Auth__btn, s.Auth__btn_fb)}
          href={`${API.BASE_URL}${API.AUTH_FACEBOOK}`}
        >
          FACEBOOK
        </a>

        <div className={s.Auth__terms}>
          By registering, you agree with our<br/>
          <a href={'https://skillhunter.io/tos/'} target={'_blank'} className={s.Auth__link}>Terms of
            Service</a> and <a href={'https://skillhunter.io/static/files/privacy_policy_en.pdf'}
                               target={'_blank'}
                               className={s.Auth__link}>Privacy
          Policy.</a>
        </div>

        <Tip
          icon={'lock'}
          className={s.Auth__security}
        >
          We do not pass on information to third parties. You can always close access to your account.
        </Tip>

        <div className={s.Auth__footer}>
          <H4 className={s.Auth__title}>
            Don't have a Google or Facebook Account?
          </H4>
          <div className={s.Auth__description}>
            No problem! You can create a Google or Facebook Account with any email address.
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  ({ user }: RootState) => ({ user }),
  {
    getUser: getUserDataSaga,
  },
)(Auth)
