import cn from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'
import { removeResourceSaga } from '../../redux/actions/resources'
import { ResourceSagaPayload } from '../../redux/interfaces/resources'
import { RootState } from '../../redux/reducers'
import { ResourceStatusTypes, ResourceType, SkillType } from '../../types'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'
import { ResourceCreator, UserResource } from '../index'
import * as s from './UserSkill.css'

interface Props {
  professionId: number
  data: SkillType
  resources: ResourceType[]
  removeResource: (data: ResourceSagaPayload) => void
}

interface State {
  isOpen: boolean
  resources: ResourceType[]
}

class UserSkill extends React.Component<Props, State> {
  state = {
    isOpen: true,
    resources: [],
  }

  likeResource = (resourceId: number, isLiked: boolean) => {
    ajax({
      url: `resource/${resourceId}/like`,
      method: isLiked ? 'POST' : 'DELETE',
    }).then(({ data }: any) => {
      this.setState({
        resources: this.state.resources.map((resource: ResourceType) => {
          if (resource.id === resourceId) {
            return {
              ...resource,
              ...data,
            }
          }

          return resource
        }),
      })
    })
  }

  changeStatus = (
    professionId: number,
    skillId: number,
    resourceId: number,
    status: ResourceStatusTypes,
  ) => {
    ajax.
      put(`user/resource/${professionId}/${skillId}/${resourceId}`, { status }).
      then(({ data }) => {
        this.setState({
          resources: this.state.resources.map((resource: ResourceType) => {
            if (resource.id === resourceId) {
              return {
                ...resource,
                ...data,
              }
            }

            return resource
          }),
        })
      })
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    const { isOpen } = this.state
    const { data, professionId, resources, removeResource } = this.props

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
              <UserResource
                key={resource.id}
                data={resource}
                handleLike={this.likeResource}
                handleRemove={removeResource}
                handleStatus={this.changeStatus}
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
  },
)(UserSkill)
