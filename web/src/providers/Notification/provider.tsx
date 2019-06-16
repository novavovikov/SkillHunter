import * as React from 'react'
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

  showNotification = async (notification: NotificationType) => {
    const id = await Hash.generate(notification.message)

    this.setState({
      notifications: [
        { id, ...notification },
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
