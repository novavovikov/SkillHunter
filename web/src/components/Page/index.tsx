import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { H2, Layout, Logo } from '../../UI'
import { Header, Nav, UserProfessions } from '../index'
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
        <Header/>
        <Layout.Data>
          <Layout.Caption>
            <H2 className={s.Page__title}>Library</H2>
          </Layout.Caption>

          {children}
        </Layout.Data>
      </Layout.Content>
    </Layout.Wrap>
  )
}

export default connect(
  ({ user }: RootState) => ({ user }),
)(Page)
