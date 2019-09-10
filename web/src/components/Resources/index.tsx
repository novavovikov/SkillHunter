import cn from 'classnames'
import React, { Component } from 'react'
import { ResourceLikeStatusSagaPayload } from '../../redux/interfaces/resources'
import { IResource, IUserResource } from '../../types'
import { IconButton, OnBoarding } from '../../UI'
import { RecommendedResources, ResourcePreview } from '../index'
import * as s from './Resources.css'
import { resources } from '../../redux/reducers/resources'

interface Props {
  data: IUserResource[]
  recommendations: IResource[]
  openCreator: () => void
  createResource: (data: Partial<IUserResource>) => void
  onChangeLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
  onUpdate: (data: Partial<IUserResource>) => void
  onRemove: (data: Partial<IUserResource>) => void
}

class Resources extends Component<Props> {
  render () {
    const {
      data,
      recommendations,
      openCreator,
      createResource,
      onUpdate,
      onChangeLikeStatus,
      onRemove,
    } = this.props

    return (
      <div className={s.Resources}>
        <div className={s.Resources__header}>
          <div className={cn(s.Resources__col, s.Resources__col_info, {
            [s.Resources__col_full]: !data.length,
          })}>
            <div className={s.Resources__creator}>
              <IconButton onClick={openCreator}>
                Add resource
              </IconButton>
            </div>

            {!data.length && (
              <OnBoarding className={s.Resources__onboarding}>
                List is empty. Add resource for skill. Collecting, reading later and sharing resource.
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

        {data.length > 0 && (
          <div className={s.Resources__body}>
            {data.map((resource: IUserResource) => (
              <ResourcePreview
                key={resource.id}
                data={resource}
                eventCategory="skillset"
                updateHandler={onUpdate}
                likeHandler={onChangeLikeStatus}
                removeHandler={onRemove}
              />
            ))}
          </div>
        )}

        {recommendations.length > 0 && (
          <RecommendedResources
            data={recommendations}
            addResource={createResource}
          />
        )}
      </div>
    )
  }
}

export default Resources
