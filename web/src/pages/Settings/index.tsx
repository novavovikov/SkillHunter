import React, { FC } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Header } from '../../components'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { withNotification } from '../../providers/Notification'
import { NotificationApiProps } from '../../providers/Notification/context'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  notificationApi: NotificationApiProps
}

const Settings: FC<Props> = ({ history, notificationApi }) => {
  const handleRemove = async () => {
    await ajax.delete('user')
    history.push(ROUTES.LOGOUT)
  }

  return (
    <>
      <Header/>
      <div>
        <p>
          <Button onClick={() => notificationApi.showNotification('Пример простого сообщения')}>
            Простое сообщение
          </Button>
        </p>
        <p>
          <Button onClick={() =>
            notificationApi.showNotification(
              'Пример сообщения об ошибке',
              NotificationTypes.error,
            )
          }>
            Сообщение об ошибке
          </Button>
        </p>
        <p>
          <Button onClick={() =>
            notificationApi.showNotification(
              'Пример простого сообщения-уведомления пользователя',
              NotificationTypes.warning,
            )
          }>
            Сообщение-предупреждение
          </Button>
        </p>
        <p>
          <Button onClick={() =>
            notificationApi.showNotification(
              'Пример сообщения об успешности операции',
              NotificationTypes.success,
            )
          }>
            Сообщение об успешности
          </Button>
        </p>

        <br/>
        <br/>
        <p>
          <Button onClick={handleRemove}>
            Remove account?
          </Button>
        </p>
      </div>
    </>
  )
}

export default compose(
  withRouter,
  withNotification,
)(Settings)
