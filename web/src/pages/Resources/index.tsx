import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Page, ResourceCreator, Resources, UserSkillHeader } from '../../components'
import { ROUTES } from '../../constants/routing'
import { addResourceToUserSkillSaga, getUserSkillSaga } from '../../redux/actions/userSkill'
import { AddResourceToUserSkillSagaPayload } from '../../redux/interfaces/userSkill'
import { RootState } from '../../redux/reducers'
import { UserSkillState } from '../../redux/reducers/userSkill'
import { IconTypes, IUserResource } from '../../types'
import { Icon } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './Resources.css'

interface Params {
  skillset: string
  skillId: string
}

interface Props extends RouteComponentProps<Params> {
  userSkill: UserSkillState
  getUserSkill: (userSkillId: number) => void
  addResource: (data: AddResourceToUserSkillSagaPayload) => void
}

interface State {
  creatorVisible: boolean
}

class ResourcesPage extends Component<Props, State> {
  state = {
    creatorVisible: false
  }

  componentDidMount (): void {
    const { match, getUserSkill } = this.props

    getUserSkill(Number(match.params.skillId))
  }

  toggleCreatorVisibility = () => {
    this.setState({
      creatorVisible: !this.state.creatorVisible,
    })

    if (!this.state.creatorVisible) {
      analytics({
        event: 'click_add_source',
        category: 'skillset'
      })
    }
  }

  createResource = (data: IUserResource) => {
    const { addResource, userSkill } = this.props

    if (userSkill) {
      const { skillsetId, id} = userSkill

      addResource({
        skillId: id,
        skillsetId,
        data
      })
    }
  }

  render () {
    const {
      match,
      userSkill,
    } = this.props

    if (!userSkill) {
      return null
    }

    const {
      userResources,
      skill: {
        name,
      },
    } = userSkill

    const { creatorVisible } = this.state

    return (
      <Page>
        <div className={s.Resources}>
          <div className={s.Resources__header}>
            <Link to={`${ROUTES.SKILLSET}/${match.params.skillset}`}>
              <Icon
                className={s.Resources__back}
                type={IconTypes.arrowLeft}
                size="24"
              />
            </Link>

            <UserSkillHeader
              name={name}
              menu={{
                addResource: this.toggleCreatorVisibility,
                removeSkill: () => undefined,
              }}
            />
          </div>

          {creatorVisible && (
            <ResourceCreator
              onSubmit={this.createResource}
              onClose={this.toggleCreatorVisibility}
            />
          )}

          {userResources && (
            <Resources
              data={userResources}
              recommendations={[]}
              openCreator={this.toggleCreatorVisibility}
              createResource={this.createResource}
              onChangeLikeStatus={() => undefined}
              onUpdate={() => undefined}
              onRemove={() => undefined}
            />
          )}
        </div>
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
    addResource: addResourceToUserSkillSaga,
  },
)(ResourcesPage)
