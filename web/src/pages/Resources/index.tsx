import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { Page, Resources } from '../../components'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { IUserResource } from '../../types'
import { ajax } from '../../utils/ajax'
import { getSkillsetFromUserData } from '../../utils/skillset'

interface Params {
  skillset: string
  skillId: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
}

interface State {
  resources: IUserResource[]
}

class ResourcesPage extends Component<Props, State> {
  state = {
    resources: []
  }

  componentDidMount (): void {
    const { user, match } = this.props

    const skillset = getSkillsetFromUserData(match.params.skillset, user.data)

    if (skillset) {
      ajax.get(`user-resource/${skillset.id}/${match.params.skillId}`).then(({ data }) => {
        this.setState({
          resources: data
        })
      })
    }
  }

  render () {
    const { resources } = this.state

    return (
      <Page>
        <Resources
          openCreator={() => null}
          data={resources}
        />
      </Page>
    )
  }
}

export default withUser(ResourcesPage)
