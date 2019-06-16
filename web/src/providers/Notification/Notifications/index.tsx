import * as React from 'react'
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
          className={s.Notifications__item}
          onClick={() => hideNotification(id)}
        >
          {message}
        </div>
      ))}
    </div>
  )
}

export default Notifications
