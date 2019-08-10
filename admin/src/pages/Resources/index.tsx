import React from 'react'
import { Table } from '../../components'
import { ajax } from '../../utils/ajax'

const Resources: React.FC = () => {
  const [resources, setResources] = React.useState([])

  React.useEffect(() => {
    ajax.
      get('resource').
      then(({ data }: any) => {
        setResources(data)
      }).catch(err => console.warn('Resources', err))
  }, [])

  const getOriginFromLink = (link: string) => {
    if (!link) {
      return null
    }

    const url = new URL(link)

    return url.origin
  }

  return (
    <Table.Table>
      <Table.Head>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>created</Table.Th>
          <Table.Th style={{ width: '500px' }}>title</Table.Th>
          <Table.Th>author</Table.Th>
          <Table.Th>picture</Table.Th>
          <Table.Th>link</Table.Th>
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
                {getOriginFromLink(resource.link)}
              </a>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Body>
    </Table.Table>
  )
}

export default Resources
