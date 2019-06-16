import * as React from 'react'
import { NotificationTypes } from '../../constants/notification'

export interface NotificationProps {
  showNotification: (message: string, type?: NotificationTypes) => void
}

export const NotificationContext = React.createContext<NotificationProps | null>(null)
