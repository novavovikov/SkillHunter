import * as React from 'react'
import { Layout } from '../../UI'
import { Header, Nav, UserProfessions } from '../index'

const Page: React.FC = ({ children }) => {
  return (
    <>
      <Header/>
      <Layout.Page>
        <Layout.Aside>
          <Nav/>
          <UserProfessions/>
        </Layout.Aside>
        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout.Page>
    </>
  )
}

export default Page
