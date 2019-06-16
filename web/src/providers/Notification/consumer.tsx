import * as React from 'react'
import { NotificationProps, NotificationContext } from './context'

export const withNotification = (WrappedComponent: React.ComponentClass<any>) => {
  class Component extends React.Component<NotificationProps> {
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
