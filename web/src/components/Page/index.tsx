import * as React from 'react'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { Layout } from '../../UI'
import { Header, Nav, UserProfessions } from '../index'

interface Props {
  user: UserState
}

const Page: React.FC<Props> = ({ children, user }) => {
  console.log(123, user.data)

  return (
    <>
      <Header/>
      <Layout.Page>
        <Layout.Aside>
          {user.data && (
            <>
              <Nav/>
              <UserProfessions/>
            </>
          )}
        </Layout.Aside>
        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout.Page>
    </>
  )
}

export default withUser(Page)
