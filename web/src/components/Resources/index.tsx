import cn from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeResourceLikeStatusSaga, removeResourceSaga, updateResourceSaga } from '../../redux/actions/resources'
import { ResourceLikeStatusSagaPayload } from '../../redux/interfaces/resources'
import { IUserResource } from '../../types'
import { IconButton, OnBoarding } from '../../UI'
import { ResourcePreview } from '../index'
import * as s from './Resources.css'

interface Props {
  data: IUserResource[]
  openCreator: () => void
  updateResource: (data: Partial<IUserResource>) => void
  changeResourceLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
  removeResource: (data: Partial<IUserResource>) => void
}

class Resources extends Component<Props> {
  render () {
    const {
      data,
      openCreator,
      updateResource,
      changeResourceLikeStatus,
      removeResource,
    } = this.props

    return (
      <div className={s.Resources}>
        <div className={s.Resources__header}>
          <div className={cn(s.Resources__col, s.Resources__col_info, {
            [s.Resources__col_full]: !data.length,
          })}>
            <div className={s.Resources__creator}>
              <IconButton onClick={openCreator}>
                Add source
              </IconButton>
            </div>

            {!data.length && (
              <OnBoarding className={s.Resources__onboarding}>
                List is empty. Add source for skill. Collecting, reading later and sharing source.
              </OnBoarding>
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

        {data.map((resource: IUserResource) => (
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
