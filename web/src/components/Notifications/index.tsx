import cn from 'classnames'
import React, { FC } from 'react'
import { connect } from 'react-redux'
import { NotificationTypes } from '../../constants/notification'
import { removeNotification } from '../../redux/actions/notifications'
import { RootState } from '../../redux/reducers'
import { NotificationTypeWithId } from '../../types'
import * as s from './Notifications.css'

interface Props {
  notifications: NotificationTypeWithId[]
  hideNotification: (id: string) => void
}

const Notifications: FC<Props> = ({ notifications, hideNotification }) => {
  return (
    <div className={s.Notifications}>
      {notifications.map(({ id, type, message }) => (
        <div
          key={id}
          className={cn(s.Notifications__item, {
            [s.Notifications__item_error]: type === NotificationTypes.error,
            [s.Notifications__item_warning]: type === NotificationTypes.warning,
            [s.Notifications__item_success]: type === NotificationTypes.success,
          })}
          onClick={() => hideNotification(id)}
        >
          {message}
        </div>
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
