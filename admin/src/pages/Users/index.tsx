import React, { Component } from 'react'
import cookies from 'js-cookie'
import { Link, Table } from '../../components'
import { ROUTES } from '../../constants/routing'
import { user } from '../../redux/reducers/user'
import { iUser } from '../../types'
import { ajax } from '../../utils/ajax'
import { redirectToLogin } from '../../utils/login'

interface State {
  total: number,
  data: iUser[]
}

class Users extends Component<{}, State> {
  state = {
    total: 0,
    data: [],
  }

  componentDidMount () {
    ajax.
      get('user').
      then(({ data }) => {
        this.setState(data)
      }).catch(err => {
      console.warn('Users', err)
    })
  }

  signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { value } = e.target as HTMLButtonElement

    ajax.
      get(`auth/${value}`).
      then(({ data }) => {
        cookies.set('authToken', data)
        redirectToLogin()
      }).catch(err => {
      console.warn('Users', err)
    })
  }

  render () {
    const { total, data }: State = this.state

    return (
      <div>
        <p>
          Total: {total}
        </p>
        <hr/>
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
            {data.map((user) => (
              <Table.Tr
                key={user.id}
              >
                <Table.Td>
                  {user.id}
                </Table.Td>
                <Table.Td>
                  <p>
                    <Link  to={`${ROUTES.USERS}/${user.id}`}>
                      {user.name}
                    </Link>
                  </p>

                  <button
                    type="button"
                    onClick={this.signIn}
                    value={user.id}
                  >
                    Sign in
                  </button>
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
      </div>
    )
  }
}

export default Users
