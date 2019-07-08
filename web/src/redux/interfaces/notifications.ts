import { NotificationType } from '../../types'
import { NotificaionActionTypes } from '../actionTypes/notifications'

export interface AddNotification {
  type: NotificaionActionTypes.ADD_NOTIFICATION,
  payload: NotificationType
}

export interface RemoveNotification {
  type: NotificaionActionTypes.REMOVE_NOTIFICATION,
  payload: string | number
}

export type NotificationAction =
  AddNotification |
  RemoveNotification
