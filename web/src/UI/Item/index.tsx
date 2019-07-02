import React, { ButtonHTMLAttributes, FC } from 'react'
import * as s from './Item.css'

interface Props extends ButtonHTMLAttributes<HTMLElement> {
  onClose?: () => void
}

const Item: FC<Props> = (props) => {
  const { children, onClick, onClose, ...rest } = props
  const handleItem = (e: any) => {
    if (typeof onClick === 'function') {
      onClick(e)
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <div
      className={s.Item}
      onClick={handleItem}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Item
