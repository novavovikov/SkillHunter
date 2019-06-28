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

    if (!data.professions.length) {
      return <Redirect to={ROUTES.INTRODUCTION}/>
    }

    const profession = data.professions[0].name

    return <Redirect to={`${ROUTES.SKILL_SET}/${profession}`}/>
  }
}

export default withUser(Home)
