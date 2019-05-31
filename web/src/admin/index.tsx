import * as React from 'react'
import { Link, RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom'
import { Container } from '../components'
import { ROUTES } from '../constants/routing'
import { Button } from '../UI'
import { ajax } from '../utils/ajax'
import Subscribers from './Subscribers'
import Users from './Users'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const clearUserData = () => {
    ajax.delete('user/skills')
    ajax.delete('user/professions')
  }

  return (
    <Container>
      <Switch>
        <Route
          path={ROUTES.ADMIN_USERS}
          component={Users}
        />
      </Switch>

      <Link to={`${ROUTES.ADMIN}${ROUTES.ADMIN_USERS}`}>
        Route
      </Link>

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
      <Users/>

      <h2>Подписчики skillhunter.io</h2>
      <Subscribers/>
    </Container>
  )
}

export default withRouter(Home)
