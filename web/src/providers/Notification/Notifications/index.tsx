import * as React from 'react'
import { NotificationType } from '../../../types'
import * as s from './Notifications.css'

interface Props {
  notifications: NotificationType[]
}

const Notifications: React.FC<Props> = ({ notifications }) => {
  return (
    <div className={s.Notifications}>
      {notifications.map(({ type, message }, index) => (
        <div
          key={index}
          className={s.Notifications__item}
        >
          {message}
        </div>
      ))}
    </div>
  )
}

export default Notifications
