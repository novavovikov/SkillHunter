import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <div>
      <div>
        Home Page
      </div>
      <button onClick={() => history.push('/login')}>
        Login
      </button>
    </div>
  )
}

export default withRouter(Home)
