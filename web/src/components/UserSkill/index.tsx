import React from 'react'
import { connect } from 'react-redux'
import { Resources } from '../../components'
import { removeSkillsSaga } from '../../redux/actions/skills'
import { RootState } from '../../redux/reducers'
import { UserResourceType, UserSkillType } from '../../types'
import { H4, Icon, Item, Menu, Status } from '../../UI'
import * as s from './UserSkill.css'

interface Props {
  data: UserSkillType
  resources: UserResourceType[]
  removeSkill: (skillIds: number[]) => void
}

interface State {
  isOpen: boolean
}

class UserSkill extends React.Component<Props, State> {
  state = {
    isOpen: true,
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
    const { isOpen } = this.state
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

          <Menu className={s.UserSkill__menu}>
            <Item onClick={this.removeSkill}>
              Delete
            </Item>
          </Menu>

          {!resources.length && !isOpen && (
            <Status
              className={s.UserSkill__empty}
              icon="arrow-down"
            >
              Expand list and add source
            </Status>
          )}
        </div>

        {isOpen && (
          <Resources
            skillsetId={data.skillsetId}
            skillId={data.id}
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
