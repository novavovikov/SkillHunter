import React, { FC } from 'react'
import { connect } from 'react-redux'
import { removeNotification } from '../../redux/actions/notifications'
import { RootState } from '../../redux/reducers'
import { INotificationWithId } from '../../types'
import { Notification } from '../../UI'
import * as s from './Notifications.css'

interface Props {
  notifications: INotificationWithId[]
  hideNotification: (id: string) => void
}

const Notifications: FC<Props> = ({ notifications, hideNotification }) => {
  return (
    <div className={s.Notifications}>
      {notifications.map(({ id, type, message }) => (
        <Notification
          key={id}
          id={id}
          type={type}
          message={message}
          onClose={hideNotification}
        />
      ))}
    </div>
  )
}

export default connect(
  ({ notifications }: RootState) => ({
    notifications: notifications.data,
  }),
  {
    hideNotification: removeNotification,
  },
)(Notifications)
