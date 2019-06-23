import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { Layout } from '../../UI'
import { Header, Nav, UserProfessions } from '../index'

interface Props {
  user: UserState
}

const Page: React.FC<Props> = ({ children, user }) => {
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

export default connect(
  ({ user }: RootState) => ({ user }),
)(Page)
