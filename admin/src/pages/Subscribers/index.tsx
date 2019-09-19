import React from 'react'
import { Table } from '../../components'
import { ajax } from '../../utils/ajax'

const Subscribers: React.FC = () => {
  const [subscribers, setSubscribers] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('subscribe/list').
      then(({ data }: any) => {
        setSubscribers(data)
      }).catch(err => console.warn('Users', err))
  }, [])

  return (
    <Table.Table>
      <Table.Head>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>email</Table.Th>
          <Table.Th>created</Table.Th>
          <Table.Th>feature</Table.Th>
          <Table.Th>userId</Table.Th>
        </Table.Tr>
      </Table.Head>
      <Table.Body>
        {subscribers.map((subscriber: any) => (
          <Table.Tr
            key={subscriber.id}
          >
            <Table.Td>
              {subscriber.id}
            </Table.Td>
            <Table.Td>
              {subscriber.email}
            </Table.Td>
            <Table.Td>
              {subscriber.created}
            </Table.Td>
            <Table.Td>
              {subscriber.feature}
            </Table.Td>
            <Table.Td>
              {subscriber.user
                ? subscriber.user.id
                : '—'
              }
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table.Table>
  )
}

export default Subscribers
