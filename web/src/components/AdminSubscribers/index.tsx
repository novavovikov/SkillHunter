import * as React from 'react'
import { ajax } from '../../utils/ajax'
import * as s from './AdminSubscribers.css'

const AdminSubscribers: React.FC = () => {
  const [users, setUsers] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('subscribe').
      then(({ data }: any) => {
        setUsers(data)
      }).catch(err => console.warn('Users', err))
  }, [])

  return (
    <table className={s.AdminSubscribers}>
      <thead>
      <tr>
        <th className={s.AdminSubscribers__td}>id</th>
        <th className={s.AdminSubscribers__td}>email</th>
        <th className={s.AdminSubscribers__td}>created</th>
        <th className={s.AdminSubscribers__td}>profession</th>
        <th className={s.AdminSubscribers__td}>expectation</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user: any) => (
        <tr
          key={user.id}
        >
          <td className={s.AdminSubscribers__td}>
            {user.id}
          </td>
          <td className={s.AdminSubscribers__td}>
            {user.email}
          </td>
          <td className={s.AdminSubscribers__td}>
            {user.created}
          </td>
          <td className={s.AdminSubscribers__td}>
            {user.profession}
          </td>
          <td className={s.AdminSubscribers__td}>
            {user.expectation}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default AdminSubscribers
