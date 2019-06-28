import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import React from 'react'
import * as s from './IconButton.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: string
}

const IconButton: FC<Props> = (
  {
    children,
    className,
    theme,
    ...rest
  },
) => {
  return (
    <button
      className={cn(
        s.IconButton,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default IconButton
