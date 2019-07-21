import { NotificationTypes } from '../constants/notification'
import ac from '../redux/actions'

export const errorHandler = (place: string, error: any) => {
  console.warn(`${place}: ${error}`)

  if (error.response && error.response.status < 500) {
    return (
      ac.addNotification({
        message: error.response.data.message,
        type: NotificationTypes.error,
      })
    )
  }

  return (
    ac.addNotification({
      message: 'Material error',
      type: NotificationTypes.error,
    })
  )
}
