import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import * as s from './Popup.css'

interface Props {
  isOpen: boolean
  onClose?: () => void
}

class Popup extends Component<Props> {
  componentDidMount (): void {
    window.addEventListener('keydown', this.onKeyPress)
  }

  componentWillUnmount (): void {
    window.removeEventListener('keydown', this.onKeyPress)
  }

  onKeyPress = (e: any) => {
    const { onClose } = this.props

    if (
      e.key === 'Escape' &&
      typeof onClose === 'function'
    ) {
      onClose()
    }
  }

  render () {
    const { isOpen, onClose, children } = this.props

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
}

export default Popup
