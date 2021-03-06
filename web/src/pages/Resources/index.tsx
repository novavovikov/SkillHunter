import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { compose } from 'redux'
import { Page } from '../../components'
import UserSkill from '../../components/UserSkill'
import { getUserSkillSaga } from '../../redux/actions/userSkill'
import { RootState } from '../../redux/reducers'
import { UserSkillState } from '../../redux/reducers/userSkill'
import { getResourcesSaga } from '../../redux/actions/resources'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { getSkillsetIdFromUserData } from '../../utils/skillset'
import { GetResourcesSagaPayload } from '../../redux/interfaces/resources'
import NotFound from '../NotFound'

interface Params {
  skillset: string
  skillId: string
}

interface Props extends RouteComponentProps<Params> {
  isLoading: boolean
  user: UserState
  userSkill: UserSkillState
  getUserSkill: (userSkillId: number) => void
  getResources: (data: GetResourcesSagaPayload) => void
}

class ResourcesPage extends Component<Props> {
  get skillId () {
    return Number(this.props.match.params.skillId)
  }

  get skillsetId (): number | null {
    const { user, match } = this.props

    return getSkillsetIdFromUserData(match.params.skillset, user)
  }

  componentDidMount (): void {
    const { getUserSkill } = this.props

    getUserSkill(this.skillId)
  }

  // FIXME два раза отправляются запросы
  componentDidUpdate () {
    const { userSkill, getResources } = this.props
    const skillsetId = this.skillsetId

    userSkill &&
    skillsetId &&
    getResources({
      skillsetId,
      skillIds: [userSkill.id],
      limit: 0
    })
  }

  render () {
    const { userSkill, isLoading } = this.props

    if (isLoading) {
      return null
    }

    if (!userSkill) {
      return <NotFound/>
    }

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

export default compose(
  withUser,
  connect(
    ({ userSkill, loading }: RootState) => ({
      userSkill,
      isLoading: loading.userSkill
    }),
    {
      getUserSkill: getUserSkillSaga,
      getResources: getResourcesSaga,
    },
  ),
)(ResourcesPage)
