import * as React from 'react'
import cn from 'classnames'
import * as s from './Input.css'

export interface InputProps {
  value: any
  placeholder?: string
  onChange: (e?: any) => void
  onKeyDown?: (e?: any) => void
  onFocus?: (e?: any) => void
  className?: string | number | symbol | any
  autoFocus?: boolean
}

const Input: React.FC<InputProps> = (
  {
    className,
    placeholder,
    value,
    ...rest
  },
) => {
  return (
    <label className={cn(s.Input, className)}>
      <input
        className={s.Input__field}
        type={'text'}
        value={value}
        {...rest}
      />
      <span
        className={cn(s.Input__placeholder, {
          [s.Input__placeholder_filled]: !!value,
        })}
      >
        {placeholder}
      </span>
    </label>
  )
}

export default Input
