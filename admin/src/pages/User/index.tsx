import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import { iUser } from '../../types'
import { ajax } from '../../utils/ajax'

interface Params {
  userId: string,
}

type Props = RouteComponentProps<Params>

interface State {
  userData: iUser | null
}

class User extends Component<Props, State> {
  state = {
    userData: null,
  }

  async componentDidMount () {
    const { match } = this.props

    const { data: userData } = await ajax.get<iUser>(`user/${match.params.userId}`)
    this.setState({ userData })
  }

  getLink = (resourceId: number) => {
    const origin = window.location.hostname
      ? 'http://localhost:3000'
      : 'app.skillhunter.io'

    return `${origin}/resource/${resourceId}`
  }

  render () {
    const { userData }: State = this.state

    if (!userData) {
      return 'Загрузка'
    }

    const { id: userId, name, skillsets }: iUser = userData

    return (
      <div style={{
        padding: '40px'
      }}>
        <h2>
          {name || userId} {name && `(${userId})`}
        </h2>

        <h4>
          Skillsets: {!skillsets.length && 'List is empty'}
        </h4>

        {skillsets.map((skillset) => (
          <ul key={skillset.id}>
            <li>
              <h3>{skillset.name}</h3>

              <h4>userSkills: {!skillset.userSkills.length && 'List is empty'}</h4>
              <ul>
                {skillset.userSkills.map(({ id: userSkillId, skill, userResources }) => (
                  <li key={userSkillId}>
                    <h3>{skill.name}</h3>

                    <h4>userResources: {!userResources.length && 'List is empty'}</h4>
                    <ul>
                      {userResources.map(({ id: resourceId, title, resource }) => (
                        <li key={resourceId}>
                          <a
                            href={this.getLink(resourceId)}
                            target="_blank"
                          >
                            {title || resource.title || resource.link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

export default User
