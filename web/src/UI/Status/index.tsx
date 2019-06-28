import cn from 'classnames'
import React, { FC } from 'react'
import { Icon } from '../index'
import * as s from './Status.css'

interface Props {
  className?: string
  icon?: string
}

const Status: FC<Props> = ({ className, icon, children }) => {
  return (
    <div className={cn(s.Status, className)}>
      <div className={s.Status__icon}>
        {icon && (
          <Icon
            type={icon}
            size="xl"
          />
        )}
      </div>
      {children}
    </div>
  )
}

export default Status
