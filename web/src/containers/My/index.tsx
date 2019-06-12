import * as React from 'react'
import { Header } from '../../components'
import { Layout } from '../../UI'

interface Props {
  logoutUser: () => void
}

const My: React.FC<Props> = () => {
  return (
    <>
      <Header/>
      <Layout.Page>
        <Layout.Aside>
          Sidebar
        </Layout.Aside>
        <Layout.Content>
          Content
        </Layout.Content>
      </Layout.Page>
    </>
  )
}

export default My
