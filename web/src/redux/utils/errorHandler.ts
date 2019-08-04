import { ENotifications } from '../../constants/notification'
import { analytics } from '../../utils/analytics'
import ac from '../actions'

export const errorHandler = (place: string, error: any) => {
  console.warn(`${place}: ${error}`)


  if (error.response && error.response.status < 500) {
    analytics({
      event: 'error_notification',
      error_message: error.response.data.message,
      category: 'error'
    })

    return (
      ac.addNotification({
        message: error.response.data.message,
        type: ENotifications.error,
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
