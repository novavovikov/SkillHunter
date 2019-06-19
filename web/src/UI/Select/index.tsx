import { SelectHTMLAttributes } from 'react'
import * as React from 'react'
import * as s from './Select.css'

interface Props {

}

const Wrap: React.FC<SelectHTMLAttributes<Props>> = ({ children, ...rest }) => {
  return (
    <select
      className={s.Select}
      {...rest}
    >
      {children}
    </select>
  )
}

const Option: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <option {...rest}>
      {children}
    </option>
  )
}

export {
  Wrap,
  Option,
}
