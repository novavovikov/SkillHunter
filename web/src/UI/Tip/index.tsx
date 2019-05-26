import * as React from 'react'
import cn from 'classnames'
import info from './icons/info.svg'
import lock from './icons/lock.svg'
import * as s from './Tip.css'

interface Props {
  className?: string
  icon: string
}

const getIcon = (icon: string) => {
  switch (icon) {
    case 'info':
      return info
    case 'lock':
      return lock
    default:
      return info
  }
}

const Tip: React.FC<Props> = (
  {
    children,
    icon,
    className
  },
) => {
  return (
    <div className={cn(s.Tip, className)}>
      {icon && (
        <i
          className={s.Tip__icon}
          dangerouslySetInnerHTML={{ __html: getIcon(icon) }}
        />
      )}
      {children}
    </div>
  )
}

export default Tip
