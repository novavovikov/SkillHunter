import React from 'react'
import { NotificationTypes } from '../../constants/notification'

export interface NotificationApiProps {
  showNotification: (message: string, type?: NotificationTypes) => void
}

export const NotificationContext = React.createContext<NotificationApiProps | null>(null)
