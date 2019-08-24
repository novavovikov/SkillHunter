import cn from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { ResourceCreator, Resources, UserSkillHeader } from '../../components'
import { ROUTES } from '../../constants/routing'
import {
  addResourceSaga,
  changeResourceLikeStatusSaga,
  removeResourceSaga,
  updateResourceSaga,
} from '../../redux/actions/resources'
import { removeSkillsSaga } from '../../redux/actions/skills'
import { AddResourceSagaPayload, ResourceLikeStatusSagaPayload } from '../../redux/interfaces/resources'
import { RootState } from '../../redux/reducers'
import { UserResourceState } from '../../redux/reducers/resources'
import { IconTypes, IResource, IUserResource, IUserSkill } from '../../types'
import { Icon, OnBoarding } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './UserSkill.css'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  data: IUserSkill
  resources: UserResourceState
  recommendedResources: IResource[]
  removeSkill: (skillIds: number[]) => void
  addResource: (data: AddResourceSagaPayload) => void
  updateResource: (data: Partial<IUserResource>) => void
  changeResourceLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
  removeResource: (data: Partial<IUserResource>) => void
}

interface State {
  isOpen: boolean
  creatorVisible: boolean
}

class UserSkill extends React.Component<Props, State> {
  state = {
    isOpen: this.props.resources.total !== 0 || this.props.recommendedResources.length > 0,
    creatorVisible: false,
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

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  removeSkill = () => {
    const { data, removeSkill } = this.props

    removeSkill([data.id])

    analytics({
      event: 'click_delete_skill',
      skill_name: data.skill.name,
      category: 'skillset'
    })
  }

  createResource = (data: Partial<IUserResource>) => {
    const { data: skillData, addResource } = this.props

    addResource({
      skillsetId: skillData.skillsetId,
      skillId: skillData.id,
      data,
    })
  }

  render () {
    const { isOpen, creatorVisible } = this.state
    const {
      data,
      resources,
      recommendedResources,
      match,
      changeResourceLikeStatus,
      updateResource,
      removeResource
    } = this.props

    const skillRoute = `${ROUTES.SKILLSET}/${match.params.skillset}${ROUTES.SKILL}/${data.id}`

    return (
      <>
        <div className={s.UserSkill}>
           <div className={s.UserSkill__caption}>
            <button
              className={s.UserSkill__switcher}
              onClick={this.toggleOpen}
            >
              <Icon
                type={isOpen ? IconTypes.arrowUp : IconTypes.arrowDown}
                size="24"
              />
            </button>

            <UserSkillHeader
              name={data.skill.name}
              link={resources.total > resources.data.length && skillRoute}
              menu={{
                addResource: this.toggleCreatorVisibility,
                removeSkill: this.removeSkill
              }}
            />

            {resources.total === 0 && !isOpen && (
              <OnBoarding
                className={s.UserSkill__empty}
                icon={IconTypes.arrowDown}
              >
                Expand list and add source
              </OnBoarding>
            )}
          </div>

          {creatorVisible && (
            <ResourceCreator
              onSubmit={this.createResource}
              onClose={this.toggleCreatorVisibility}
            />
          )}

          {isOpen && (
            <Resources
              data={resources.data}
              recommendations={recommendedResources}
              openCreator={this.toggleCreatorVisibility}
              createResource={this.createResource}
              onChangeLikeStatus={changeResourceLikeStatus}
              onUpdate={updateResource}
              onRemove={removeResource}
            />
          )}
        </div>

        {isOpen && resources.total > resources.data.length && (
          <Link
            to={skillRoute}
            className={cn(s.UserSkill__link, s.UserSkill__link_more)}
          >
            See all
            <Icon
              type={IconTypes.arrowRight}
              size="18"
            />
          </Link>
        )}
      </>
    )
  }
}

export default compose<any>(
  withRouter,
  connect(
    ({ resources, recommendedResources }: RootState, { data }: Props) => ({
      resources: resources[data.id] || { total: 0, data: [] },
      recommendedResources: recommendedResources[data.id] || [],
    }),
    {
      removeSkill: removeSkillsSaga,
      addResource: addResourceSaga,
      removeResource: removeResourceSaga,
      updateResource: updateResourceSaga,
      changeResourceLikeStatus: changeResourceLikeStatusSaga,
    },
  ),
)(UserSkill)
