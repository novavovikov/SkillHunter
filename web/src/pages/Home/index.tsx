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
    const { user: { data } } = this.props

    if (!data) {
      return <Redirect to={ROUTES.AUTH}/>
    }

    if (!data.skillsets.length) {
      return <Redirect to={ROUTES.INTRODUCTION}/>
    }

    const skillset = data.skillsets[0].name

    return <Redirect to={`${ROUTES.SKILLSET}/${skillset}`}/>
  }
}

export default withUser(Home)
