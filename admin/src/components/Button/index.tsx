import cn from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'
import * as s from './Button.css'

const Button: React.FC<ButtonHTMLAttributes<HTMLElement>> = (
  {
    children,
    className,
    ...rest
  },
) => {
  return (
    <button
      className={cn(
        s.Button,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
