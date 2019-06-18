import cn from 'classnames'
import * as React from 'react'
import { ResourceType, SkillType } from '../../types'
import { ajax } from '../../utils/ajax'
import { Resource, ResourceCreator } from '../index'
import * as s from './Skill.css'

interface Props {
  professionId: number
  data: SkillType
}

interface State {
  isOpen: boolean
  resources: ResourceType[]
}

class Skill extends React.Component<Props, State> {
  state = {
    isOpen: true,
    resources: [],
  }

  componentDidMount () {
    const { professionId, data: skillData } = this.props

    ajax.
      get(`user/resources/${professionId}/${skillData.id}`).
      then(({ data }) => {
        this.setState({
          resources: data.map(({ resource }: any) => resource),
        })
      })
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    const { isOpen, resources } = this.state
    const { data, professionId } = this.props

    return (
      <div className={s.Skill}>
        <div className={s.Skill__header}>
          <h4 className={s.Skill__title}>
            {data.name}
          </h4>

          {!isOpen && (
            <button
              className={cn(s.Skill__switcher, s.Skill__button)}
              onClick={this.toggleOpen}
            >
              Show
            </button>
          )}

          <ResourceCreator
            className={s.Skill__button}
            professionId={professionId}
            skillId={data.id}
          />
        </div>

        {isOpen && (
          <div className={s.Skill__body}>
            {resources.map((resource: ResourceType) => (
              <Resource
                key={resource.id}
                data={resource}
              />
            ))}
          </div>
        )}

        {isOpen && (
          <div className={s.Skill__footer}>
            <button
              className={s.Skill__switcher}
              onClick={this.toggleOpen}
            >
              Hide
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Skill
