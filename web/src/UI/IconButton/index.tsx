import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import React from 'react'
import * as s from './IconButton.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: string
  size?: string
}

const IconButton: FC<Props> = (
  {
    children,
    className,
    size,
    ...rest
  },
) => {
  return (
    <button
      className={cn(
        s.IconButton,
        {
          [s.IconButton_s]: size === 's',
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default IconButton
