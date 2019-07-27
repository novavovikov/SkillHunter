import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { Page, Resources, UserSkillHeader } from '../../components'
import { IUserSkill } from '../../types'
import { ajax } from '../../utils/ajax'
import * as s from './Resources.css'

interface Params {
  skillset: string
  skillId: string
}

interface Props extends RouteComponentProps<Params> {
}

interface State {
  skillData: IUserSkill | null
}

class ResourcesPage extends Component<Props, State> {
  state = {
    skillData: null,
  }

  componentDidMount (): void {
    const { match } = this.props

    ajax.get(`user-skill/${match.params.skillId}/resources`).then(({ data }) => {
      this.setState({
        skillData: data,
      })
    })
  }

  render () {
    const { skillData } = this.state

    if (!skillData) {
      return null
    }

    const {
      userResources,
      skill: {
        name,
      },
    } = skillData

    return (
      <Page>
        <UserSkillHeader
          className={s.Resources__header}
          name={name}
          menu={{
            addResource: () => undefined,
            removeSkill: () => undefined,
          }}
        />

        <Resources
          openCreator={() => null}
          data={userResources}
        />
      </Page>
    )
  }
}

export default ResourcesPage
