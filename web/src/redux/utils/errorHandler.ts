import { ENotifications } from '../../constants/notification'
import { analytics } from '../../utils/analytics'
import ac from '../actions'

export const errorHandler = (place: string, error: any) => {
  console.warn(`${place}: ${error}`)

  if (window.navigator.vibrate) {
    window.navigator.vibrate(200)
  }

  if (error.response && error.response.status < 500) {
    const { message, type } = error.response.data

    analytics({
      event: 'error_notification',
      error_message: message,
      category: type || 'error'
    })

    return (
      ac.addNotification({
        message,
        type: type || ENotifications.error,
      })
    )
  }

  analytics({
    event: 'error_notification',
    error_message: 'System error. Try again.',
    category: 'error'
  })

  return (
    ac.addNotification({
      message: 'System error. Try again.',
      type: ENotifications.error,
    })
  )
}
