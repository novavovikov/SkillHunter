import cn from 'classnames'
import React, { FC } from 'react'
import { ResourceStatusTypes } from '../../types'
import * as s from './Status.css'

interface Props {
  className?: string
  value: ResourceStatusTypes | string
}

const Status: FC<Props> = ({ value, className }) => {
  return (
    <div className={cn(
      s.Status,
      {
        [s.Status_backlog]: value === ResourceStatusTypes.Backlog,
        [s.Status_plan]: value === ResourceStatusTypes.Plan,
        [s.Status_done]: value === ResourceStatusTypes.Done,
      },
      className
    )}>
      {value}
    </div>
  )
}

export default Status
