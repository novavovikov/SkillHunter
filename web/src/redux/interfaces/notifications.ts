import { INotification } from '../../types'
import { NotificaionActionTypes } from '../actionTypes/notifications'

export interface AddNotification {
  type: NotificaionActionTypes.ADD_NOTIFICATION,
  payload: INotification
}

export interface RemoveNotification {
  type: NotificaionActionTypes.REMOVE_NOTIFICATION,
  payload: string | number
}

export type NotificationAction =
  AddNotification |
  RemoveNotification
