import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Header } from '../../components'
import { ROUTES } from '../../constants/routing'
import { Button, Layout } from '../../UI'
import { ajax } from '../../utils/ajax'

const Settings: React.FC<RouteComponentProps> = ({ history }) => {
  const handleRemove = async () => {
    await ajax.delete('user')
    history.push(ROUTES.LOGOUT)
  }

  return (
    <>
      <Header/>
      <Layout.Page>
        <div>
          <p>Remove account?</p>

          <Button onClick={handleRemove}>
            Remove
          </Button>
        </div>
      </Layout.Page>
    </>
  )
}

export default withRouter(Settings)
