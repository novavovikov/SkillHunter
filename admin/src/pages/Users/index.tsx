import React from 'react'
import { Table, Link } from '../../components'
import { ROUTES } from '../../constants/routing'
import { user } from '../../redux/reducers/user'
import { iUser } from '../../types'
import { ajax } from '../../utils/ajax'

const Users: React.FC = () => {
  const [users, setUsers] = React.useState<iUser[]>([])

  React.useEffect(() => {
    ajax.
      get('user').
      then(({ data }) => {
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
        {users.map((user) => (
          <Table.Tr
            key={user.id}
          >
            <Table.Td>
              {user.id}
            </Table.Td>
            <Table.Td>
              <Link
                to={`${ROUTES.USERS}/${user.id}`}
              >
                {user.name}
              </Link>
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
