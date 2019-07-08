import { NotificationType } from '../../types'
import { NotificaionActionTypes } from '../actionTypes/notifications'
import { AddNotification, RemoveNotification } from '../interfaces/notifications'

export const addNotification = (notification: NotificationType): AddNotification => ({
  type: NotificaionActionTypes.ADD_NOTIFICATION,
  payload: notification,
})

export const removeNotification = (notificationId: string | number): RemoveNotification => ({
  type: NotificaionActionTypes.REMOVE_NOTIFICATION,
  payload: notificationId,
})
