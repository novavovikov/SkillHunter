import cn from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'
import { changeResourceLikeStatusSaga, removeResourceSaga, updateResourceSaga } from '../../redux/actions/resources'
import { ResourceLikeStatusSagaPayload, ResourceSagaPayload } from '../../redux/interfaces/resources'
import { RootState } from '../../redux/reducers'
import { ResourceType, SkillType } from '../../types'
import { Button } from '../../UI'
import { Resource, ResourceCreator } from '../index'
import * as s from './UserSkill.css'

interface Props {
  professionId: number
  data: SkillType
  resources: ResourceType[]
  updateResource: (data: Partial<ResourceType>) => void
  changeResourceLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
  removeResource: (data: ResourceSagaPayload) => void
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
      professionId,
      resources,
      updateResource,
      changeResourceLikeStatus,
      removeResource,
    } = this.props

    return (
      <div className={s.UserSkill}>
        <div className={s.UserSkill__header}>
          <h4 className={s.UserSkill__title}>
            {data.name}
          </h4>

          {!isOpen && (
            <button
              className={cn(s.UserSkill__switcher, s.UserSkill__button)}
              onClick={this.toggleOpen}
            >
              Show
            </button>
          )}

          <ResourceCreator
            className={s.UserSkill__button}
            professionId={professionId}
            skillId={data.id}
          />
        </div>

        {isOpen && (
          <div className={s.UserSkill__body}>
            {!resources.length && (
              <div className={s.UserSkill__empty}>
                <div className={s.UserSkill__emptyText}>
                  Your source list is empty!
                </div>
                <Button>
                  Add your first source
                </Button>
              </div>
            )}

            {resources.map((resource: ResourceType) => (
              <Resource
                key={resource.id}
                data={resource}
                updateHandler={updateResource}
                likeHandler={changeResourceLikeStatus}
                removeHandler={removeResource}
              />
            ))}
          </div>
        )}

        {isOpen && (
          <div className={s.UserSkill__footer}>
            <button
              className={cn(s.UserSkill__switcher, s.UserSkill__switcher_hide)}
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

export default connect(
  ({ resources }: RootState, { data }: any) => ({
    resources: resources[data.id] || [],
  }),
  {
    removeResource: removeResourceSaga,
    updateResource: updateResourceSaga,
    changeResourceLikeStatus: changeResourceLikeStatusSaga,
  },
)(UserSkill)
