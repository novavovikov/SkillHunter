import React, { ChangeEvent, Component } from 'react'
import { Button, Table } from '../../components'
import { ISkill } from '../../types'
import { ajax } from '../../utils/ajax'

enum AcceptedFilters {
  'all' = 'All',
  'accepted' = 'Accepted',
  'notAccepted' = 'Not accepted'
}

interface State {
  skills: ISkill[]
  acceptedFilters: AcceptedFilters
}

class Skills extends Component<{}, State> {
  state = {
    skills: [],
    acceptedFilters: AcceptedFilters.all,
  }

  async componentDidMount () {
    const { data: skills } = await ajax.get('skill')
    this.setState({ skills })
  }

  handleAcceptance = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target

      const { data } = await ajax.put(`skill/${value}`, { accepted: checked })
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

  setAcceptedFilter = (e: any) => {
    switch (e.target.value) {
      case AcceptedFilters.all:
        this.setState({ acceptedFilters: AcceptedFilters.notAccepted })
        break
      case AcceptedFilters.notAccepted:
        this.setState({ acceptedFilters: AcceptedFilters.accepted })
        break
      default:
        this.setState({ acceptedFilters: AcceptedFilters.all })
    }
  }

  render () {
    const { skills, acceptedFilters } = this.state

    const filteredSkills = acceptedFilters === AcceptedFilters.all
      ? skills
      : skills.filter((skill: ISkill) => {
        if (acceptedFilters === AcceptedFilters.accepted) {
          return skill.accepted
        }

        if (acceptedFilters === AcceptedFilters.notAccepted) {
          return !skill.accepted
        }
      })

    return (
      <div>
        <p>
          Total: {skills.length}
        </p>

        <p>
          <button
            onClick={this.setAcceptedFilter}
            value={acceptedFilters}
          >
            {acceptedFilters}
          </button>
        </p>
        <hr/>

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
            {filteredSkills.map((skill: ISkill) => (
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
                  <label>
                    <input
                      type="checkbox"
                      checked={skill.accepted}
                      onChange={this.handleAcceptance}
                      value={skill.id}
                    />
                    <span>accepted</span>
                  </label>
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
      </div>
    )
  }
}

export default Skills
