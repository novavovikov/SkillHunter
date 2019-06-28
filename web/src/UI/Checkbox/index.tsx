import React, { FC } from 'react'
import * as s from './Checkbox.css'

interface Props {
  value?: string | number
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (e: any) => void
}

const Checkbox: FC<Props> = ({ children, ...rest }) => {
  return (
    <label className={s.Checkbox}>
      <input
        className={s.Checkbox__input}
        type={'checkbox'}
        {...rest}
      />
      <i className={s.Checkbox__indicator}/>

      {children && (
        <span className={s.Checkbox__content}>
        {children}
      </span>
      )}
    </label>
  )
}

export default Checkbox
