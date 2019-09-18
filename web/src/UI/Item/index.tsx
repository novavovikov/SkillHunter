import React, { ButtonHTMLAttributes, FC } from 'react'
import * as s from './Item.css'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
}

const Item: FC<Props> = (props) => {
  const { children, ...rest } = props

  return (
    <button
      className={s.Item}
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Item
