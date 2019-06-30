import cn from 'classnames'
import React, { ButtonHTMLAttributes, FC } from 'react'
import * as s from './SimpleButton.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button: FC<Props> = (
  {
    children,
    className,
    ...rest
  },
) => {
  return (
    <button
      className={cn(
        s.SimpleButton,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
