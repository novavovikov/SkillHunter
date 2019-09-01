import React, { Component } from 'react'
import { Button, Table } from '../../components'
import { ajax } from '../../utils/ajax'
import { IResource } from '../../types'

interface Props {}

interface State {
  resources: IResource[]
}

class Resources extends Component<Props, State> {
  state = {
    resources: [],
  }

  componentDidMount () {
    ajax.
      get('resource').
      then(({ data }: any) => {
        this.setState({
          resources: data,
        })
      })
  }

  getOriginFromLink = (link: string) => {
    if (!link) {
      return null
    }

    const url = new URL(link)

    return url.origin
  }

  handleRefresh = (e: any) => {
    const { resources }: State = this.state
    const resourceId = Number(e.target.value)

    ajax.
      get(`resource/${resourceId}/refresh`).
      then(({ data }) => {
        this.setState({
          resources: resources.map(resource => {
            return resource.id === resourceId
              ? { ...resource, ...data }
              : resource
          }),
        })
      })
  }

  render () {
    const { resources } = this.state

    return (
      <div>
        <p>
          Total: {resources.length}
        </p>
        <hr/>
        <Table.Table>
          <Table.Head>
            <Table.Tr>
              <Table.Th>id</Table.Th>
              <Table.Th>created</Table.Th>
              <Table.Th style={{ width: '500px' }}>title</Table.Th>
              <Table.Th>author</Table.Th>
              <Table.Th>picture</Table.Th>
              <Table.Th>link</Table.Th>
              <Table.Th>refresh</Table.Th>
            </Table.Tr>
          </Table.Head>
          <Table.Body>
            {resources.map((resource: any) => (
              <Table.Tr
                key={resource.id}
              >
                <Table.Td>
                  {resource.id}
                </Table.Td>
                <Table.Td>
                  {resource.created}
                </Table.Td>
                <Table.Td>
                  {resource.title}
                </Table.Td>
                <Table.Td>
                  {resource.author
                    ? resource.author.map((author: string) => (
                      <div key={author}>
                        {author}
                      </div>
                    ))
                    : '—'}
                </Table.Td>
                <Table.Td>
                  {resource.picture && (
                    <img
                      src={resource.picture}
                      alt={''}
                      style={{
                        width: 16,
                      }}
                    />
                  )}
                </Table.Td>
                <Table.Td>
                  <a
                    href={resource.link}
                    title={resource.link}
                    target="_blank"
                  >
                    {this.getOriginFromLink(resource.link)}
                  </a>
                </Table.Td>
                <Table.Td>
                  <Button
                    onClick={this.handleRefresh}
                    value={resource.id}
                  >
                    Refresh
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

export default Resources
