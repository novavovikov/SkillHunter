import cn from 'classnames'
import React, { FC } from 'react'
import { IconTypes } from '../../types'
import { Icon } from '../index'
import * as s from './OnBoarding.css'

interface Props {
  className?: string
  icon?: IconTypes
  onClick?: () => void | null
}

const OnBoarding: FC<Props> = ({ className, icon, children, onClick }) => {
  return (
    <div
      className={cn(s.OnBoarding, className)}
      onClick={onClick}
    >
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
