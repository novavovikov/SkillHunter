import * as React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'

const Home: React.FC = () => {
  const clearUserData = () => {
    ajax.post('user/skills', ['Дичь'])
    ajax.post('user/professions', ['Дичь'])
  }

  return (
    <div>
      <div>
        Home Page
      </div>

      <div>
        <Button onClick={clearUserData}>
          Очистить скилы и профессии
        </Button>
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
          Logout
        </Link>
      </div>
    </div>
  )
}

export default Home
