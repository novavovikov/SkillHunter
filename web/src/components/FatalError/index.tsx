import React, { FC } from 'react'

const FatalError: FC = () => {
  return (
    <div className={'fatal-error'}>
      Что-то пошло не так. Проверьте подключение к серверу
    </div>
  )
}

export default FatalError
