import React, { FC } from 'react'
import { createPortal } from 'react-dom'
import * as s from './Popup.css'

interface Props {
  isOpen: boolean
  onClose?: () => void
}

const Popup: FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null
  }

  return createPortal(
    (
      <div className={s.Popup}>
        <div className={s.Popup__content}>
          {children}
        </div>
        <div
          className={s.Popup__overlay}
          onClick={onClose}
        />
      </div>
    ),
    document.body,
  )
}

export default Popup
