import React, { FC } from 'react'
import cn from 'classnames'
import { ResourceStatusTypes } from '../../types'
import * as s from './Status.css'

interface Props {
  className?: string
  value: ResourceStatusTypes | string
}

const Status: FC<Props> = ({ value, className }) => {
  return (
    <div className={cn(s.Status, className)}>
      {value}
    </div>
  )
}

export default Status
