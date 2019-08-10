import React from 'react'
import { Redirect } from 'react-router'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'

interface Props {
  user: UserState
}

class Home extends React.Component<Props> {
  render () {
    const { user  } = this.props

    if (!user) {
      return <Redirect to={ROUTES.AUTH}/>
    }

    if (!user.skillsets.length) {
      return <Redirect to={ROUTES.INTRODUCTION}/>
    }

    const skillset = user.skillsets[0].name

    return <Redirect to={`${ROUTES.SKILLSET}/${skillset}`}/>
  }
}

export default withUser(Home)
