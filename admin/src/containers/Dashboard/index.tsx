import React from 'react'
import { Button } from '../../components'
import { ajax } from '../../utils/ajax'

const Dashboard: React.FC = () => {
  const [message, setMessage] = React.useState('')

  const clearUserData = () => {
    Promise.
      all([
        ajax.delete('user/skills'),
        ajax.delete('user/professions'),
      ]).
      then(() => setMessage('Скиллы сброшены')).
      catch(() => setMessage('Ошибка: Что-то пошло не так'))

  }

  return (
    <div>
      <Button onClick={clearUserData}>
        Очистить скилы и профессии
      </Button>

      <div style={{
        marginTop: 10
      }}>
        {message}
      </div>
    </div>
  )
}

export default Dashboard
