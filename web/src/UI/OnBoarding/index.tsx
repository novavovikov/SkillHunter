import cn from 'classnames'
import React, { FC } from 'react'
import { IconTypes } from '../../types'
import { Icon } from '../index'
import * as s from './OnBoarding.css'

interface Props {
  className?: string
  icon?: IconTypes
}

const OnBoarding: FC<Props> = ({ className, icon, children }) => {
  return (
    <div className={cn(s.OnBoarding, className)}>
      <div className={s.OnBoarding__icon}>
        {icon && (
          <Icon
            type={icon}
            size="24"
          />
        )}
      </div>
      {children}
    </div>
  )
}

export default OnBoarding
