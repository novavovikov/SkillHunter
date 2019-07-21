import React from 'react'
import cn from 'classnames'
import s from './Input.scss'

const Input = ({ className, ...rest }) => {
  return (
    <input
      className={cn(s.Input, className)}
      {...rest}
    />
  )
}

export default Input
