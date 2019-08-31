import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Page } from '../../components'
import UserSkill from '../../components/UserSkill'
import { getUserSkillSaga } from '../../redux/actions/userSkill'
import { RootState } from '../../redux/reducers'
import { UserSkillState } from '../../redux/reducers/userSkill'

interface Params {
  skillset: string
  skillId: string
}

interface Props extends RouteComponentProps<Params> {
  userSkill: UserSkillState
  getUserSkill: (userSkillId: number) => void
}

class ResourcesPage extends Component<Props> {
  componentDidMount (): void {
    const { match, getUserSkill } = this.props

    getUserSkill(Number(match.params.skillId))
  }

  render () {
    const { userSkill } = this.props

    if (!userSkill) {
      return null
    }

    console.log(222, userSkill)

    return (
      <Page>
        <UserSkill
          asPage
          data={userSkill}
        />
      </Page>
    )
  }
}

export default connect(
  ({ userSkill }: RootState) => ({
    userSkill,
  }),
  {
    getUserSkill: getUserSkillSaga,
  },
)(ResourcesPage)
