import React from 'react'
import { compose } from 'redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { LOGIN_BACK_URL_STORAGE_KEY } from '../../constants/login'

interface Props extends RouteComponentProps {
  user: UserState
}

class Home extends React.Component<Props> {
  getRedirectUrl = () => {
    const { user } = this.props
    const backUrl = sessionStorage.getItem(LOGIN_BACK_URL_STORAGE_KEY)
    sessionStorage.removeItem(LOGIN_BACK_URL_STORAGE_KEY)

    if (!user) {
      return `${ROUTES.LOGIN}?backUrl=${backUrl}`
    }

    if (!user.skillsets.length) {
      return ROUTES.INTRODUCTION
    }

    if (backUrl) {
      const url = new URL(backUrl)

      return `${url.pathname}${url.search}`
    }

    const [skillset] = user.skillsets

    return `${ROUTES.SKILLSET}/${skillset.name}`
  }

  render () {
    const redirectUrl = this.getRedirectUrl()

    return <Redirect to={redirectUrl}/>
  }
}

export default compose(
  withRouter,
  withUser,
)(Home)
