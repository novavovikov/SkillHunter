import cn from 'classnames'
import React, { FC } from 'react'
import * as s from './Tip.css'

interface Props {
  className?: string
  icon: string
}

const Tip: FC<Props> = (
  {
    children,
    icon,
    className,
  },
) => {
  return (
    <div className={cn(s.Tip, className)}>
      {icon && (
        <i
          className={cn(s.Tip__icon, {
            [s.Tip__icon_info]: icon === 'info',
            [s.Tip__icon_lock]: icon === 'lock',
          })}
        />
      )}
      {children}
    </div>
  )
}

export default Tip
