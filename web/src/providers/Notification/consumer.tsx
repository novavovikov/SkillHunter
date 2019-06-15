import * as React from 'react'
import { NotificationContextInterface, NotificationContext } from './context'

export const withNotification = (WrappedComponent: React.ComponentClass<any>) => {
  class Component extends React.Component<NotificationContextInterface> {
    static displayName = WrappedComponent.name || 'WrappedNotificationComponent'

    render () {
      return (
        <NotificationContext.Consumer>
          {(notificationApi: any) =>
            <WrappedComponent
              notificationApi={notificationApi}
              {...this.props}
            />
          }
        </NotificationContext.Consumer>
      )
    }
  }

  return Component
}
