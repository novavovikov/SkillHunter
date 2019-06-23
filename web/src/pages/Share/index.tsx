import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Page, Resource } from '../../components'
import { ResourceType } from '../../types'
import { ajax } from '../../utils/ajax'

interface State {
  resources: ResourceType[]
}

class Share extends React.Component<RouteComponentProps, State> {
  state = {
    resources: [],
  }

  async componentDidMount () {
    const { data }: any = await ajax.get(`resource${this.props.location.search}`)

    this.setState({
      resources: data,
    })
  }

  render () {
    const { resources } = this.state

    return (
      <Page>
        {resources.map((resource: ResourceType) => (
          <Resource
            key={resource.id}
            data={resource}
            shared
          />
        ))}
      </Page>
    )
  }
}

export default withRouter(Share)
