import React from 'react'
import { Table } from '../../components'
import { ajax } from '../../utils/ajax'

const Professions: React.FC = () => {
  const [skillsets, setSkillsets] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('skillset').
      then(({ data }: any) => {
        setSkillsets(data)
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
        {skillsets.map((skillset: any) => (
          <Table.Tr key={skillset.id}>
            <Table.Td>
              {skillset.id}
            </Table.Td>
            <Table.Td>
              {skillset.name}
            </Table.Td>
            <Table.Td>
              {skillset.created}
            </Table.Td>
            <Table.Td>
              {skillset.accepted
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
