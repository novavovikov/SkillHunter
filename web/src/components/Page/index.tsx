import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { H2, Layout, Logo } from '../../UI'
import { Nav, UserProfessions, HeaderMenu } from '../index'
import * as s from './Page.css'

interface Props {
  user: UserState
}

const Page: React.FC<Props> = ({ children, user }) => {
  return (
    <Layout.Wrap>
      <Layout.Aside>
        <Logo className={s.Page__logo}/>

        {user.data && (
          <>
            <Nav/>
            <UserProfessions/>
          </>
        )}
      </Layout.Aside>

      <Layout.Content>
        <Layout.Header>
          <HeaderMenu/>
        </Layout.Header>

        <Layout.Caption>
          <H2 className={s.Page__title}>Library</H2>
        </Layout.Caption>
        <Layout.Data>
          {children}
        </Layout.Data>
      </Layout.Content>
    </Layout.Wrap>
  )
}

export default connect(
  ({ user }: RootState) => ({ user }),
)(Page)
