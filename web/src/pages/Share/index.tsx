import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, Resource } from '../../components'
import { changeResourceLikeStatusSaga } from '../../redux/actions/resources'
import { ResourceLikeStatusSagaPayload } from '../../redux/interfaces/resources'
import { ResourceType } from '../../types'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  changeResourceLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
}

interface State {
  resources: ResourceType[]
}

class Share extends React.Component<Props, State> {
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
    const { changeResourceLikeStatus } = this.props
    const { resources } = this.state

    return (
      <Page>
        {resources.map((resource: ResourceType) => (
          <Resource
            key={resource.id}
            data={resource}
            likeHandler={changeResourceLikeStatus}
            shared
          />
        ))}
      </Page>
    )
  }
}

export default compose(
  withRouter,
  connect(
    null,
    {
      changeResourceLikeStatus: changeResourceLikeStatusSaga,
    },
  ),
)(Share)
