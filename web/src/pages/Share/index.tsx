import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, ResourcePreview } from '../../components'
import { changeResourceLikeStatusSaga } from '../../redux/actions/resources'
import { ResourceLikeStatusSagaPayload } from '../../redux/interfaces/resources'
import { IUserResource } from '../../types'
import { ajax } from '../../utils/ajax'

interface Props extends RouteComponentProps {
  changeResourceLikeStatus: (data: ResourceLikeStatusSagaPayload) => void
}

interface State {
  resources: IUserResource[]
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
        {resources.map((resource: IUserResource) => (
          <ResourcePreview
            key={resource.id}
            eventCategory="share"
            data={resource}
            likeHandler={changeResourceLikeStatus}
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
