import React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, UserSkill } from '../../components'
import { CREATOR_SKILL_QUERY, ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { getSkillsDataSaga } from '../../redux/actions/skills'
import { RootState } from '../../redux/reducers'
import { ResourcesState } from '../../redux/reducers/resources'
import { UserState } from '../../redux/reducers/user'
import { IUserSkill } from '../../types'
import { Button } from '../../UI'
import { analytics } from '../../utils/analytics'
import * as s from './Skillset.css'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
  isLoading: boolean
  skills: IUserSkill[]
  resources: ResourcesState
  getSkills: (skillsetId: number) => void
}

class Skillset extends React.Component<Props> {
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

  handleSkillCreator = () => {
    const { location } = this.props
    const queryParams = new URLSearchParams(location.search)
    queryParams.append(CREATOR_SKILL_QUERY.param, CREATOR_SKILL_QUERY.value)

    this.props.history.push({
      search: queryParams.toString(),
    })

    analytics({
      event: 'click_add_skill'
    })
  }

  render () {
    const {
      match,
      skills,
      isLoading
    } = this.props

    if (!match.params.skillset) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <Page>
        {!isLoading && skills.map((skill) => (
          <UserSkill
            key={skill.id}
            data={skill}
          />
        ))}

        {!isLoading && !skills.length && (
          <div className={s.Skillset__empty}>
            <div>
              Skillset list is empty
            </div>

            <Button
              onClick={this.handleSkillCreator}
              className={s.Skillset__btn}
            >
              Add skill
            </Button>
          </div>
        )}
      </Page>
    )
  }
}

export default compose(
  withUser,
  withRouter,
  connect(
    ({ skills, loading }: RootState) => ({
      isLoading: loading.resources || loading.skill,
      skills,
    }),
    {
      getSkills: getSkillsDataSaga,
    },
  ),
)(Skillset)
