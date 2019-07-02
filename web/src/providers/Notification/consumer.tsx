import React from 'react'
import { NotificationApiProps, NotificationContext } from './context'

interface InjectedProps {
  notificationApi: NotificationApiProps
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Subtract<T, K> = Omit<T, keyof K>

export const withNotification = <T extends InjectedProps> (WrappedComponent: React.ComponentClass<T>) => (
  class Component extends React.Component<Subtract<T, InjectedProps>> {
    static displayName = WrappedComponent.name || 'WrappedNotificationComponent'

    render () {
      return (
        <NotificationContext.Consumer>
          {(notificationApi: NotificationApiProps) =>
            <WrappedComponent
              notificationApi={notificationApi}
              {...this.props as T}
            />
          }
        </NotificationContext.Consumer>
      )
    }
  }
)
