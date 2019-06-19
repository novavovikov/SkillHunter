import { ButtonHTMLAttributes } from 'react'
import * as React from 'react'
import * as s from './Item.css'

const Item: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
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
