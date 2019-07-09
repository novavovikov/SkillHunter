import React from 'react'
import { Table } from '../../components'
import { user } from '../../redux/reducers/user'
import { ajax } from '../../utils/ajax'

const Users: React.FC = () => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('user').
      then(({ data }: any) => {
        setUsers(data)
      }).catch(err => console.warn('Users', err))
  }, [])

  return (
    <Table.Table>
      <Table.Head>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>name</Table.Th>
          <Table.Th>email</Table.Th>
          <Table.Th>created</Table.Th>
          <Table.Th>locale</Table.Th>
          <Table.Th>role</Table.Th>
          <Table.Th>picture</Table.Th>
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
              {user.name}
            </Table.Td>
            <Table.Td>
              {user.email}
            </Table.Td>
            <Table.Td>
              {user.created}
            </Table.Td>
            <Table.Td>
              {user.locale}
            </Table.Td>
            <Table.Td>
              {user.role}
            </Table.Td>
            <Table.Td>
              {user.picture && (
                <img
                  src={user.picture}
                  alt={''}
                  style={{
                    width: 64,
                  }}
                />
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table.Table>
  )
}

export default Users
