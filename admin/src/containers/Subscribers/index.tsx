import * as React from 'react'
import { Table } from '../../components'
import { ajax } from '../../utils/ajax'

const Subscribers: React.FC = () => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('subscribe').
      then(({ data }: any) => {
        setUsers(data)
      }).catch(err => console.warn('Users', err))
  }, [])

  return (
    <Table.Table>
      <Table.Head>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>email</Table.Th>
          <Table.Th>created</Table.Th>
          <Table.Th>profession</Table.Th>
          <Table.Th>expectation</Table.Th>
        </Table.Tr>
      </Table.Head>
      <Table.Body>
        {users.map((user: any) => (
          <Table.Tr
            key={user.id}
          >
            <Table.Td>
              {user.id}
            </Table.Td>
            <Table.Td>
              {user.email}
            </Table.Td>
            <Table.Td>
              {user.created}
            </Table.Td>
            <Table.Td>
              {user.profession}
            </Table.Td>
            <Table.Td>
              {user.expectation}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table.Table>
  )
}

export default Subscribers
