import { Reducer } from 'redux'
import { NOTIFICATION_MESSAGES_LIMIT, NOTIFICATION_MESSAGES_TIMEOUT } from '../../constants/notification'
import { INotificationWithId } from '../../types'
import { generateHash } from '../../utils/hash'
import { notificationTimer } from '../action-creators/notification'
import { NotificaionActionTypes } from '../actionTypes/notifications'
import { NotificationAction } from '../interfaces/notifications'

interface Timer {
  notificationId: string,
  timer: any
}

export interface NotificationState {
  timers: Timer[],
  data: INotificationWithId[]
}

const initState: NotificationState = {
  timers: [],
  data: [],
}

export const notifications: Reducer<NotificationState, NotificationAction> = (state = initState, action) => {
  switch (action.type) {
    case NotificaionActionTypes.ADD_NOTIFICATION:
      const generatedId = generateHash()

      return {
        timers: [
          ...state.timers,
          {
            notificationId: generatedId,
            timer: setTimeout(notificationTimer.bind(null, generatedId), NOTIFICATION_MESSAGES_TIMEOUT),
          },
        ],
        data: [
          {
            id: generatedId,
            ...action.payload,
          },
          ...state.data,
        ].slice(0, NOTIFICATION_MESSAGES_LIMIT),
      }
    case NotificaionActionTypes.REMOVE_NOTIFICATION:
      return {
        timers: state.timers.filter(({ notificationId }) => notificationId !== action.payload),
        data: state.data.filter(({ id }) => id !== action.payload),
      }
    default:
      return state
  }
}
