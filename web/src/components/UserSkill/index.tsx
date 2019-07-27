import cn from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { ResourceCreator, Resources, UserSkillHeader } from '../../components'
import { ROUTES } from '../../constants/routing'
import { addResourceSaga } from '../../redux/actions/resources'
import { removeSkillsSaga } from '../../redux/actions/skills'
import { AddResourceSagaPayload } from '../../redux/interfaces/resources'
import { RootState } from '../../redux/reducers'
import { UserResourceState } from '../../redux/reducers/resources'
import { IUserSkill } from '../../types'
import { H4, Icon, Item, Menu, OnBoarding } from '../../UI'
import * as s from './UserSkill.css'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  data: IUserSkill
  resources: UserResourceState
  addResource: (data: AddResourceSagaPayload) => void
  removeSkill: (skillIds: number[]) => void
}

interface State {
  isOpen: boolean
  creatorVisible: boolean
}

class UserSkill extends React.Component<Props, State> {
  state = {
    isOpen: this.props.resources.total !== 0,
    creatorVisible: false,
  }

  toggleCreatorVisibility = () => {
    this.setState({
      creatorVisible: !this.state.creatorVisible,
    })
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  removeSkill = () => {
    const { data, removeSkill } = this.props

    removeSkill([data.id])
  }

  createResource = (data: any) => {
    const { data: skillData, addResource } = this.props

    addResource({
      skillsetId: skillData.skillsetId,
      skillId: skillData.id,
      data,
    })

    this.toggleCreatorVisibility()
  }

  render () {
    const { isOpen, creatorVisible } = this.state
    const {
      data,
      resources,
      match,
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
                type={isOpen ? 'arrow-up' : 'arrow-down'}
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
                icon="arrow-down"
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
              openCreator={this.toggleCreatorVisibility}
              data={resources.data}
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
              type="arrow-right"
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
    ({ resources }: RootState, { data }: any) => ({
      resources: resources[data.id] || { total: 0, data: [] },
    }),
    {
      addResource: addResourceSaga,
      removeSkill: removeSkillsSaga,
    },
  ),
)(UserSkill)
