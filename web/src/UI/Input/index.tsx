import cn from 'classnames'
import React, { FC, InputHTMLAttributes } from 'react'
import * as s from './Input.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameField?: string
}

const Input: FC<InputProps> = (
  {
    className,
    classNameField,
    ...rest
  },
) => {
  return (
    <label className={cn(s.Input, className)}>
      <input
        className={cn(s.Input__field, classNameField)}
        type={'text'}
        {...rest}
      />
    </label>
  )
}

export default Input
