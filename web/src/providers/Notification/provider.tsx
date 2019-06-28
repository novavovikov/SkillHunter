import React from 'react'
import { NotificationTypes } from '../../constants/notification'
import { NotificationType } from '../../types'
import { Hash } from '../../utils/hash'
import { NotificationContext } from './context'
import Notifications from './Notifications'

export interface NotificationProviderType extends NotificationType {
  id: string
}

interface Timer {
  [key: string]: any
}

interface State {
  notifications: NotificationProviderType[]
}

export class NotificationProvider extends React.Component<{}, State> {
  static MESSAGE_TIMEOUT = 8000
  static MESSAGE_LIMIT = 3

  state = {
    notifications: [],
  }

  timers: Timer = {}

  componentWillUnmount (): void {
    for (const timer in this.timers) {
      clearTimeout(this.timers[timer])
    }
  }

  setAutoCloseTimer (id: string | number) {
    const timerFunc = () => {
      this.hideNotification(id)
      delete this.timers[id]
    }

    timerFunc.bind(this)

    this.timers[id] = setTimeout(timerFunc, NotificationProvider.MESSAGE_TIMEOUT)
  }

  showNotification = (message: string, type: NotificationTypes) => {
    const id = Math.random().toString(36).substring(7)

    this.setState({
      notifications: [
        {
          id,
          message,
          type: type || null,
        },
        ...this.state.notifications,
      ].slice(0, NotificationProvider.MESSAGE_LIMIT),
    })

    this.setAutoCloseTimer(id)
  }

  hideNotification = (notificationId: string | number) => {
    this.setState({
      notifications: this.state.notifications.filter(({ id }) => id !== notificationId),
    })

    clearTimeout(this.timers[notificationId])
  }

  render () {
    return (
      <>
        <NotificationContext.Provider
          value={{
            showNotification: this.showNotification,
          }}
        >
          {this.props.children}
        </NotificationContext.Provider>

        <Notifications
          notifications={this.state.notifications}
          hideNotification={this.hideNotification}
        />
      </>
    )
  }
}
