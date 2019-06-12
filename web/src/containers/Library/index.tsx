import * as React from 'react'
import { Header, Nav } from '../../components'
import { Layout } from '../../UI'

interface Props {
  logoutUser: () => void
}

const Library: React.FC<Props> = () => {
  return (
    <>
      <Header/>
      <Layout.Page>
        <Layout.Aside>
          <Nav/>
        </Layout.Aside>
        <Layout.Content>
          Content
        </Layout.Content>
      </Layout.Page>
    </>
  )
}

export default Library
