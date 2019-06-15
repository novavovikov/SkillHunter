import * as React from 'react'
import { NotificationType } from '../../types'

export interface NotificationContextInterface {
  showNotification: (notification: NotificationType) => void
}

export const NotificationContext = React.createContext<NotificationContextInterface | null>(null)
