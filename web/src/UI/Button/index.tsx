import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import React from 'react'
import * as s from './Button.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: string
}

const Button: FC<Props> = (
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
        s.Button,
        className,
        {
          [s.Button_plus]: theme === 'plus',
          [s.Button_large]: theme === 'large'
        }
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
