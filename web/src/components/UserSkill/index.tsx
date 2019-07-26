import React from 'react'
import { connect } from 'react-redux'
import { ResourceCreator, Resources } from '../../components'
import { removeSkillsSaga } from '../../redux/actions/skills'
import { RootState } from '../../redux/reducers'
import { IUserResource, IUserSkill } from '../../types'
import { H4, Icon, Item, Menu, OnBoarding } from '../../UI'
import * as s from './UserSkill.css'

interface Props {
  data: IUserSkill
  resources: IUserResource[]
  removeSkill: (skillIds: number[]) => void
}

interface State {
  isOpen: boolean
  creatorVisible: boolean
}

class UserSkill extends React.Component<Props, State> {
  state = {
    isOpen: !!this.props.resources.length,
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

  render () {
    const { isOpen, creatorVisible } = this.state
    const {
      data,
      resources,
    } = this.props

    return (
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

          <H4 className={s.UserSkill__title}>
            {data.skill.name}
          </H4>

          <Menu
            className={s.UserSkill__menu}
            position="left"
          >
            <Item onClick={this.toggleCreatorVisibility}>
              Add resource
            </Item>
            <Item onClick={this.removeSkill}>
              Delete skill
            </Item>
          </Menu>

          {!resources.length && !isOpen && (
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
            skillsetId={data.skillsetId}
            skillId={data.id}
            onClose={this.toggleCreatorVisibility}
          />
        )}

        {isOpen && (
          <Resources
            openCreator={this.toggleCreatorVisibility}
            data={resources}
          />
        )}
      </div>
    )
  }
}

export default connect(
  ({ resources }: RootState, { data }: any) => ({
    resources: resources[data.id] || [],
  }),
  {
    removeSkill: removeSkillsSaga,
  },
)(UserSkill)
