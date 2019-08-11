import React, { ChangeEvent, Component } from 'react'
import { Button, Table } from '../../components'
import { ISkill } from '../../types'
import { ajax } from '../../utils/ajax'

const ACCEPTANCE = [
  {
    label: 'accepted',
    value: true,
  },
  {
    label: 'pending',
    value: false,
  },
]

interface State {
  skills: ISkill[]
}

class Skills extends Component<{}, State> {
  state = {
    skills: [],
  }

  async componentDidMount () {
    const { data: skills } = await ajax.get('skill')
    this.setState({ skills })
  }

  getAcceptanceValue = (accepted: boolean) => {
    const selectedItem = ACCEPTANCE.find(({ value }) => value === accepted)

    if (selectedItem) {
      return selectedItem.label
    }

    return ACCEPTANCE[0].label
  }

  handleAcceptance = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const skillId = e.target.getAttribute('data-skill-id')
    const selectedItem = ACCEPTANCE.find(({ label }) => label === value)

    if (selectedItem) {
      const { data } = await ajax.put(`skill/${skillId}`, { accepted: selectedItem.value })
      const { skills }: State = this.state

      this.setState({
        skills: skills.map(skill => {
          if (skill.id === data.id) {
            return data
          }

          return skill
        }),
      })
    }
  }

  handleRemove = async (e: any) => {
    const { value } = e.target

    try {
      await ajax.delete(`skill/${value}`)
      const { skills }: State = this.state
      const skillId = Number(value)

      this.setState({
        skills: skills.filter(({ id }) => id !== skillId)
      })
    } catch (e) {
      alert('Skill has user relation')
    }
  }

  render () {
    const { skills } = this.state

    return (
      <Table.Table>
        <Table.Head>
          <Table.Tr>
            <Table.Th>id</Table.Th>
            <Table.Th>name</Table.Th>
            <Table.Th>created</Table.Th>
            <Table.Th>accepted</Table.Th>
            <Table.Th>remove</Table.Th>
          </Table.Tr>
        </Table.Head>
        <Table.Body>
          {skills.map((skill: ISkill) => (
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
                <select
                  value={this.getAcceptanceValue(skill.accepted)}
                  onChange={this.handleAcceptance}
                  data-skill-id={skill.id}
                >
                  {ACCEPTANCE.map(({ label }) => (
                    <option
                      key={label}
                      value={label}
                    >
                      {label}
                    </option>
                  ))}
                </select>
              </Table.Td>
              <Table.Td>
                <Button
                  onClick={this.handleRemove}
                  value={skill.id}
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
}

export default Skills
