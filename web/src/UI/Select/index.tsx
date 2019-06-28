import { FC, SelectHTMLAttributes } from 'react'
import React from 'react'
import * as s from './Select.css'

interface Props {

}

const Wrap: FC<SelectHTMLAttributes<Props>> = ({ children, ...rest }) => {
  return (
    <select
      className={s.Select}
      {...rest}
    >
      {children}
    </select>
  )
}

const Option: FC<Props> = ({ children, ...rest }) => {
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
