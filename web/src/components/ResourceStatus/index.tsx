import React, { FC } from 'react'
import cn from 'classnames'
import { EResourceStatus } from '../../types'
import * as s from './ResourceStatus.css'

interface Props {
  status: EResourceStatus | string
}

const ResourceStatus: FC<Props> = ({ status }) => {
  return (
    <button className={cn(s.ResourceStatus, {
      [s.ResourceStatus_backlog]: status === EResourceStatus.Backlog,
      [s.ResourceStatus_plan]: status === EResourceStatus.Plan,
      [s.ResourceStatus_done]: status === EResourceStatus.Done,
    })}>
      {status}
    </button>
  )
}

export default ResourceStatus
