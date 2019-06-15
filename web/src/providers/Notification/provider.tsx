import * as React from 'react'
import { NotificationType } from '../../types'
import { NotificationContext } from './context'
import Notifications from './Notifications'

interface Props {}

interface State {
  notifications: NotificationType[]
}

export class NotificationProvider extends React.Component<Props, State> {
  state = {
    notifications: [],
  }

  showNotification = (notification: NotificationType) => {
    this.setState({
      notifications: [notification, ...this.state.notifications].slice(0, 3)
    })
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

        <Notifications notifications={this.state.notifications}/>
      </>
    )
  }
}
