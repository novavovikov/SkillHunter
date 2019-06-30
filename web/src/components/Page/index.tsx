import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { Layout, Logo } from '../../UI'
import { Header, Nav, SkillCreator, UserSkillSet } from '../index'
import * as s from './Page.css'

interface Props {
  user: UserState
}

const Page: FC<Props> = ({ children, user }) => {
  return (
    <Layout.Wrap>
      <Layout.Aside>
        <Logo className={s.Page__logo}/>

        {user.data && (
          <>
            <UserSkillSet/>
            <Nav/>
            <SkillCreator/>
          </>
        )}
      </Layout.Aside>

      <Layout.Content>
        <Header/>
        <Layout.Data>
          {/*<Layout.Caption>*/}
          {/*  <H2 className={s.Page__title}>Skillset</H2>*/}
          {/*</Layout.Caption>*/}

          {children}
        </Layout.Data>
      </Layout.Content>
    </Layout.Wrap>
  )
}

export default connect(
  ({ user }: RootState) => ({ user }),
)(Page)
