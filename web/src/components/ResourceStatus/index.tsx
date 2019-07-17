import React, { FC } from 'react'
import cn from 'classnames'
import { ResourceStatusTypes } from '../../types'
import * as s from './ResourceStatus.css'

interface Props {
  status: ResourceStatusTypes | string
}

const ResourceStatus: FC<Props> = ({ status }) => {
  return (
    <button className={cn(s.ResourceStatus, {
      [s.ResourceStatus_backlog]: status === ResourceStatusTypes.Backlog,
      [s.ResourceStatus_plan]: status === ResourceStatusTypes.Plan,
      [s.ResourceStatus_done]: status === ResourceStatusTypes.Done,
    })}>
      {status}
    </button>
  )
}

export default ResourceStatus
