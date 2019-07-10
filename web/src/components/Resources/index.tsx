import cn from 'classnames'
import React, { Component, FC } from 'react'
import { connect } from 'react-redux'
import { changeResourceLikeStatusSaga, removeResourceSaga, updateResourceSaga } from '../../redux/actions/resources'
import { ResourceLikeStatusSagaPayload, ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceType } from '../../types'
import { IconButton, Status } from '../../UI'
import { ResourcePreview, ResourceCreator } from '../index'
import * as s from './Resources.css'

interface Props {
  data: ResourceType[]
  skillsetId: number
  skillId: number
  updateResource: (data: Partial<ResourceType>) => void
  changeResourceLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
  removeResource: (data: ResourceSagaPayload) => void
}

interface State {
  creatorVisible: boolean
}

class Resources extends Component<Props, State> {
  state = {
    creatorVisible: false
  }

  toggleCreatorVisibility = () => {
    this.setState({
      creatorVisible: !this.state.creatorVisible
    })
  }

  render () {
    const {
      data,
      skillsetId,
      skillId,
      updateResource,
      changeResourceLikeStatus,
      removeResource,
    } = this.props

    const { creatorVisible } = this.state

    return (
      <div className={s.Resources}>
        <div className={s.Resources__header}>
          <div className={cn(s.Resources__col, s.Resources__col_info, {
            [s.Resources__col_full]: !data.length,
          })}>
            <div className={s.Resources__creator}>
              {creatorVisible && (
                <ResourceCreator
                  skillsetId={skillsetId}
                  skillId={skillId}
                  onClose={this.toggleCreatorVisibility}
                />
              )}

              <IconButton onClick={this.toggleCreatorVisibility}>
                Add source
              </IconButton>
            </div>

            {!data.length && (
              <Status>
                List is empty. Add source for skill. Collecting, reading later and sharing source.
              </Status>
            )}
          </div>

          {data.length > 0 && (
            <>
              <div className={cn(s.Resources__col, s.Resources__col_status)}>
                status
              </div>
              <div className={cn(s.Resources__col, s.Resources__col_actions)}>
                actions
              </div>
            </>
          )}
        </div>

        {data.map((resource: ResourceType) => (
          <ResourcePreview
            key={resource.id}
            data={resource}
            updateHandler={updateResource}
            likeHandler={changeResourceLikeStatus}
            removeHandler={removeResource}
          />
        ))}
      </div>
    )
  }
}

export default connect(
  null,
  {
    removeResource: removeResourceSaga,
    updateResource: updateResourceSaga,
    changeResourceLikeStatus: changeResourceLikeStatusSaga,
  },
)(Resources)
