import * as React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Container, AdminUsers, AdminSubscribers } from '../../components'
import { ROUTES } from '../../constants/routing'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const clearUserData = () => {
    ajax.delete('user/skills')
    ajax.delete('user/professions')
  }

  return (
    <Container>

      <div>
        <Button onClick={clearUserData}>
          Очистить скилы и профессии
        </Button>
      </div>

      <div>
        <Link
          to={ROUTES.INTRODUCTION}
          style={{
            display: 'inline-flex',
            border: '2px solid #666',
            padding: '10px 20px',
            marginTop: '15px',
          }}
        >
          {ROUTES.INTRODUCTION}
        </Link>

        <div>
          *Чтобы попасть на страницу {ROUTES.INTRODUCTION} надо очистить скиллы и профессии, а затем перезагрузить
          страницу.
        </div>
      </div>

      <div>
        <Link
          to={ROUTES.LOGOUT}
          style={{
            display: 'inline-flex',
            border: '2px solid #666',
            padding: '10px 20px',
            marginTop: '15px',
          }}
        >
          {ROUTES.LOGOUT}
        </Link>
      </div>

      <h2>Пользователи app.skillhunter.io</h2>
      <AdminUsers/>

      <h2>Подписчики skillhunter.io</h2>
      <AdminSubscribers/>
    </Container>
  )
}

export default withRouter(Home)
