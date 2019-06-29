import cn from 'classnames'
import React, { FC } from 'react'
import { connect } from 'react-redux'
import { changeResourceLikeStatusSaga, removeResourceSaga, updateResourceSaga } from '../../redux/actions/resources'
import { ResourceLikeStatusSagaPayload, ResourceSagaPayload } from '../../redux/interfaces/resources'
import { ResourceType } from '../../types'
import { Status } from '../../UI'
import { Resource, ResourceCreator } from '../index'
import * as s from './Resources.css'

interface Props {
  data: ResourceType[]
  professionId: number
  skillId: number
  updateResource: (data: Partial<ResourceType>) => void
  changeResourceLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
  removeResource: (data: ResourceSagaPayload) => void
}

const Resources: FC<Props> = (props) => {
  const {
    data,
    professionId,
    skillId,
    updateResource,
    changeResourceLikeStatus,
    removeResource,
  } = props

  return (
    <div className={s.Resources}>
      <div className={s.Resources__header}>
        <div className={cn(s.Resources__col, s.Resources__col_info, {
          [s.Resources__col_full]: !data.length,
        })}>
          <ResourceCreator
            professionId={professionId}
            skillId={skillId}
          />

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
        <Resource
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

export default connect(
  null,
  {
    removeResource: removeResourceSaga,
    updateResource: updateResourceSaga,
    changeResourceLikeStatus: changeResourceLikeStatusSaga,
  },
)(Resources)
