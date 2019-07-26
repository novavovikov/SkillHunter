import cn from 'classnames'
import React, { Component } from 'react'
import { Icon } from '../index'
import { ENotifications } from '../../constants/notification'
import s from './Notification.css'

interface Props {
  id: string
  type?: ENotifications | string
  message: string
  onClose: (id: string) => void
}

interface State {
  timer: number
}

class Notification extends Component<Props, State> {
  state = {
    timer: 8,
  }

  timer = setInterval(() => {
    this.setState({
      timer: this.state.timer - 1,
    })
  }, 1000)

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  onClose = () => {
    const { id, onClose } = this.props

    onClose(id)
  }

  render () {
    const { type, message } = this.props
    const { timer } = this.state

    return (
      <div className={s.Notification}>
        <button
          className={s.Notification__close}
          onClick={this.onClose}
        >
          <Icon
            type="close"
            size="24"
          />
        </button>
        <div
          className={cn(s.Notification__text, {
            [s.Notification__text_error]: type === ENotifications.error,
            [s.Notification__text_warning]: type === ENotifications.warning,
            [s.Notification__text_success]: type === ENotifications.success,
          })}
        >
          {message}
        </div>
        <div className={s.Notification__timer}>
          {timer} sec.
        </div>
      </div>
    )
  }
}

export default Notification
