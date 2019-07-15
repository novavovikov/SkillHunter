import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page } from '../../components'
import { NotificationTypes } from '../../constants/notification'
import { ROUTES } from '../../constants/routing'
import { addNotification } from '../../redux/actions/notifications'
import { NotificationType } from '../../types'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  showNotification: (data: NotificationType) => void
}

const Settings: FC<Props> = ({ history, showNotification }) => {
  const handleRemove = async () => {
    await ajax.delete('user')
    history.push(ROUTES.LOGOUT)
  }

  return (
    <Page>
        <p>
          <Button onClick={() => showNotification({ message: 'Пример простого сообщения' })}>
            Простое сообщение
          </Button>
        </p>
        <p>
          <Button onClick={() =>
            showNotification({
              message: 'Пример сообщения об ошибке',
              type: NotificationTypes.error,
            })
          }>
            Сообщение об ошибке
          </Button>
        </p>
        <p>
          <Button onClick={() =>
            showNotification({
              message: 'Пример простого сообщения-уведомления пользователя',
              type: NotificationTypes.warning,
            })
          }>
            Сообщение-предупреждение
          </Button>
        </p>
        <p>
          <Button onClick={() =>
            showNotification({
              message: 'Пример сообщения об успешности операции',
              type: NotificationTypes.success,
            })

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
    </Page>
  )
}

export default compose(
  withRouter,
  connect(null, {
    showNotification: addNotification,
  }),
)(Settings)
