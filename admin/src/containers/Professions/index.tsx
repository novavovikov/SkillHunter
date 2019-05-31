import * as React from 'react'
import { Table } from '../../components'
import { ajax } from '../../utils/ajax'

const Professions: React.FC = () => {
  const [professions, setProfessions] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('profession').
      then(({ data }: any) => {
        setProfessions(data)
      }).catch(err => console.warn('Professions', err))
  }, [])

  return (
    <Table.Table>
      <Table.Head>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>name</Table.Th>
          <Table.Th>created</Table.Th>
          <Table.Th>accepted</Table.Th>
        </Table.Tr>
      </Table.Head>
      <Table.Body>
        {professions.map((profession: any) => (
          <Table.Tr key={profession.id}>
            <Table.Td>
              {profession.id}
            </Table.Td>
            <Table.Td>
              {profession.name}
            </Table.Td>
            <Table.Td>
              {profession.created}
            </Table.Td>
            <Table.Td>
              {profession.accepted
                ? 'Подтвержденный'
                : 'Неподтвержденный'
              }
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table.Table>
  )
}

export default Professions
