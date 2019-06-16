import cn from 'classnames'
import * as React from 'react'
import { NotificationTypes } from '../../../constants/notification'
import { NotificationProviderType } from '../provider'
import * as s from './Notifications.css'

interface Props {
  notifications: NotificationProviderType[]
  hideNotification: (id: string | number) => void
}

const Notifications: React.FC<Props> = ({ notifications, hideNotification }) => {
  return (
    <div className={s.Notifications}>
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          className={cn(s.Notifications__item, {
            [s.Notifications__item_error]: type === NotificationTypes.error,
            [s.Notifications__item_warning]: type === NotificationTypes.warning,
            [s.Notifications__item_success]: type === NotificationTypes.success
          })}
          onClick={() => hideNotification(id)}
        >
          {message}
        </div>
      ))}
    </div>
  )
}

export default Notifications
