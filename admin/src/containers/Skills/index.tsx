import * as React from 'react'
import { Table } from '../../components'
import { ajax } from '../../utils/ajax'

const Skills: React.FC = () => {
  const [skills, setSkills] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('skill').
      then(({ data }: any) => {
        setSkills(data)
      }).catch(err => console.warn('Skills', err))
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
        {skills.map((skill: any) => (
          <Table.Tr key={skill.id}>
            <Table.Td>
              {skill.id}
            </Table.Td>
            <Table.Td>
              {skill.name}
            </Table.Td>
            <Table.Td>
              {skill.created}
            </Table.Td>
            <Table.Td>
              {skill.accepted
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

export default Skills
