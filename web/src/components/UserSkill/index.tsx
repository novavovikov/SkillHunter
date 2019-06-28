import React from 'react'
import { connect } from 'react-redux'
import { Resources } from '../../components'
import { RootState } from '../../redux/reducers'
import { ResourceType, SkillType } from '../../types'
import { Icon, Status } from '../../UI'
import * as s from './UserSkill.css'

interface Props {
  professionId: number
  data: SkillType
  resources: ResourceType[]
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

  render () {
    const { isOpen } = this.state
    const {
      data,
      resources,
      professionId,
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
              size="xl"
            />
          </button>

          <h4 className={s.UserSkill__title}>
            {data.name}
          </h4>

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
          <Resources data={resources}/>
        )}
      </div>
    )
  }
}

export default connect(
  ({ resources }: RootState, { data }: any) => ({
    resources: resources[data.id] || [],
  }),
)(UserSkill)
