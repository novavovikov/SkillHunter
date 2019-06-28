import { ButtonHTMLAttributes, FC } from 'react'
import React from 'react'
import * as s from './Item.css'

const Item: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  return (
    <button
      className={s.Item}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Item
