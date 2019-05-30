import * as React from 'react'
import { user } from '../../redux/reducers/user'
import { ajax } from '../../utils/ajax'
import * as s from './AdminUsers.css'

const AdminUsers: React.FC = () => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('user').
      then(({ data }: any) => {
        setUsers(data)
      }).catch(err => console.warn('Users', err))
  }, [])

  return (
    <table className={s.AdminUsers}>
      <thead>
      <tr>
        <th className={s.AdminUsers__td}>id</th>
        <th className={s.AdminUsers__td}>name</th>
        <th className={s.AdminUsers__td}>email</th>
        <th className={s.AdminUsers__td}>created</th>
        <th className={s.AdminUsers__td}>locale</th>
        <th className={s.AdminUsers__td}>role</th>
        <th className={s.AdminUsers__td}>picture</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user: any) => (
        <tr
          key={user.id}
        >
          <td className={s.AdminUsers__td}>
            {user.id}
          </td>
          <td className={s.AdminUsers__td}>
            {user.name}
          </td>
          <td className={s.AdminUsers__td}>
            {user.email}
          </td>
          <td className={s.AdminUsers__td}>
            {user.created}
          </td>
          <td className={s.AdminUsers__td}>
            {user.locale}
          </td>
          <td className={s.AdminUsers__td}>
            {user.role}
          </td>
          <td className={s.AdminUsers__td}>
            {user.picture && (
              <img
                src={user.picture}
                alt={''}
                style={{
                  width: 64,
                }}
              />
            )}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default AdminUsers
