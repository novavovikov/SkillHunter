import cn from 'classnames'
import * as React from 'react'
import * as s from './Button.css'

interface Props {
  className?: string,
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<Props> = (
  {
    children,
    className,
    ...rest
  },
) => {
  return (
    <button
      className={cn(s.Button, className)}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
