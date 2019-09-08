import React, { ChangeEvent } from 'react'
import { Button, Table } from '../../components'
import { ajax } from '../../utils/ajax'
import { iSkillset } from '../../types'

const Professions: React.FC = () => {
  const [skillsets, setSkillsets] = React.useState<iSkillset[]>([])

  React.useEffect(() => {
    ajax.
      get('skillset').
      then(({ data }: any) => {
        setSkillsets(data)
      }).catch(err => console.warn('Professions', err))
  }, [])

  const handleAcceptance = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target

    const { data } = await ajax.put(`skillset/${value}`, { accepted: checked })

    setSkillsets(skillsets.map((skillset: iSkillset) => {
      return skillset.id === data.id
        ? { ...skillset, ...data }
        : skillset
    }))
  }

  const handleRemove = async (e: any) => {
    const { value } = e.target

    try {
      await ajax.delete(`skillset/${value}`)
      const skillsetId = Number(value)

      setSkillsets(skillsets.filter(({ id }) => id !== skillsetId))
    } catch (e) {
      alert('Skill has user relation')
    }
  }

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
              <label
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                <input
                  type="checkbox"
                  checked={skillset.accepted}
                  onChange={handleAcceptance}
                  value={skillset.id}
                />
                <span>accepted</span>
              </label>
            </Table.Td>
            <Table.Td>
              <Button
                onClick={handleRemove}
                value={skillset.id}
              >
                Remove
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table.Table>
  )
}

export default Professions
