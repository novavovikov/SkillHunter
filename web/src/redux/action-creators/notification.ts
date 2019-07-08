import { removeNotification } from '../actions/notifications'
import { store } from '../store'

export function notificationTimer (notificationId: string) {
  store.dispatch(removeNotification(notificationId))
}
