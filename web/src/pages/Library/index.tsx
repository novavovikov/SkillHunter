import React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, UserSkill } from '../../components'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { getSkillsDataSaga } from '../../redux/actions/skills'
import { RootState } from '../../redux/reducers'
import { ResourcesState } from '../../redux/reducers/resources'
import { SkillsState } from '../../redux/reducers/skills'
import { UserState } from '../../redux/reducers/user'
import { SkillType } from '../../types'
import { Loader } from '../../UI'
import * as s from './Library.css'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState,
  skills: SkillsState
  resources: ResourcesState
  getSkills: (skillsetId: number) => void
}

class Library extends React.Component<Props> {
  componentDidMount (): void {
    this.getSkills()
  }

  componentDidUpdate ({ match }: Readonly<Props>): void {
    if (this.props.match.params.skillset !== match.params.skillset) {
      this.getSkills()
    }
  }

  getSkillsetId = () => {
    const { user, match } = this.props

    if (!user.data) {
      return
    }

    const skillset: any = user.data.skillsets.find(({ name }) => name === match.params.skillset) || {}

    return skillset.id
  }

  getSkills = () => {
    const skillsetId = this.getSkillsetId()

    if (skillsetId) {
      this.props.getSkills(skillsetId)
    }
  }

  render () {
    const {
      match,
      skills: {
        isLoading,
        data,
      },
    } = this.props

    if (!match.params.skillset) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <Page>
        {isLoading && (
          <div className={s.Library__loader}>
            <Loader/>
          </div>
        )}

        {!isLoading && data.map((skill: SkillType) => (
          <UserSkill
            key={skill.id}
            skillsetId={this.getSkillsetId()}
            data={skill}
          />
        ))}
      </Page>
    )
  }
}

export default compose(
  withUser,
  withRouter,
  connect(
    ({ skills }: RootState) => ({
      skills,
    }),
    {
      getSkills: getSkillsDataSaga,
    },
  ),
)(Library)
