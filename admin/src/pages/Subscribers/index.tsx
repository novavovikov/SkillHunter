import React, { Component } from 'react'
import { Button, Table } from '../../components'
import { ajax } from '../../utils/ajax'

interface Subscribe {

}

interface State {
  subscribers: any[]
}

class Subscribers extends Component<{}, State> {
  state = {
    subscribers: []
  }

  componentDidMount (): void {
    ajax.
    get('subscribe/list').
    then(({ data }: any) => {
      this.setState({
        subscribers: data
      })
    }).catch(err => console.warn('Subscribers', err))
  }

  handleRemove = async (e: any) => {
    const { value } = e.target

    try {
      await ajax.delete(`subscribe/${value}`)
      const { subscribers }: State = this.state
      const subscriberId = Number(value)

      this.setState({
        subscribers: subscribers.filter(({ id }) => id !== subscriberId)
      })
    } catch (e) {
      alert('Server error')
    }
  }

  render () {
    const { subscribers } = this.state

    return (
      <Table.Table>
        <Table.Head>
          <Table.Tr>
            <Table.Th>id</Table.Th>
            <Table.Th>email</Table.Th>
            <Table.Th>created</Table.Th>
            <Table.Th>feature</Table.Th>
            <Table.Th>userId</Table.Th>
            <Table.Th>remove</Table.Th>
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
              <Table.Td>
                <Button
                  onClick={this.handleRemove}
                  value={subscriber.id}
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

export default Subscribers
