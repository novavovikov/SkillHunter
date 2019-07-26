import cn from 'classnames'
import React, { FC } from 'react'
import { EResourceStatus } from '../../types'
import * as s from './Status.css'

interface Props {
  className?: string
  value: EResourceStatus | string
}

const Status: FC<Props> = ({ value, className }) => {
  return (
    <div className={cn(
      s.Status,
      {
        [s.Status_backlog]: value === EResourceStatus.Backlog,
        [s.Status_plan]: value === EResourceStatus.Plan,
        [s.Status_done]: value === EResourceStatus.Done,
      },
      className
    )}>
      {value}
    </div>
  )
}

export default Status
