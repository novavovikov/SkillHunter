import React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Page, UserSkill } from '../../components'
import { CREATOR_SKILL_QUERY, ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { getResourcesSaga } from '../../redux/actions/resources'
import { getSkillsDataSaga, resetSkillsData } from '../../redux/actions/skills'
import { RootState } from '../../redux/reducers'
import { UserState } from '../../redux/reducers/user'
import { IUserSkill } from '../../types'
import { Button, Head } from '../../UI'
import { analytics } from '../../utils/analytics'
import { getSkillsetIdFromUserData } from '../../utils/skillset'
import { GetResourcesSagaPayload } from '../../redux/interfaces/resources'
import * as s from './Skillset.css'
import { addParamToQuery } from '../../utils/url'

interface Params {
  skillset: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
  isLoading: boolean
  skills: IUserSkill[]
  getSkills: (skillsetId: number) => void
  resetSkills: () => void
  getResources: (data: GetResourcesSagaPayload) => void
}

class Skillset extends React.Component<Props> {
  get skillsetId (): number | null {
    const { user, match } = this.props

    return getSkillsetIdFromUserData(match.params.skillset, user)
  }

  componentDidMount (): void {
    this.getSkills()
  }

  componentDidUpdate (prevProps: Readonly<Props>): void {
    const { match, skills, getResources } = this.props

    if (match.params.skillset !== prevProps.match.params.skillset) {
      this.getSkills()
    }

    if (skills.length !== prevProps.skills.length) {
      const skillsetId = this.skillsetId
      const skillIds = skills.map(({ id }) => id)

      skillsetId && getResources({ skillsetId, skillIds })
    }
  }

  componentWillUnmount (): void {
    // TODO подумать над тем, чтобы не сбрасывать состояние скиллов, а просто перезапросить материалы
    // можно просто обновлять данные по материалам
    this.props.resetSkills()
  }

  getSkills = () => {
    const { skills } = this.props
    const skillsetId = this.skillsetId

    if (skillsetId) {
      this.props.getSkills(skillsetId)
    }
  }

  handleSkillCreator = () => {
    const { location, history } = this.props
    const search = addParamToQuery(
      location.search,
      CREATOR_SKILL_QUERY.param,
      CREATOR_SKILL_QUERY.value,
    )

    history.push({ search })
    analytics({
      event: 'click_add_skill',
      category: 'skillset'
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
        <Head title={`Skillset | ${match.params.skillset}`}/>

        {!isLoading && skills.map((skill) => (
          <UserSkill
            key={skill.id}
            data={skill}
          />
        ))}

        {!isLoading && !skills.length && (
          <div className={s.Skillset__empty}>
            <div className={s.Skillset__emptyText}>
              You library is empty
              <div className={s.Skillset__btnLabel}>
                Add some skills
              </div>
            </div>

            <Button
              className={s.Skillset__btn}
              onClick={this.handleSkillCreator}
              theme="large"
            >
              Add
              <span className={s.Skillset__btnLabel}>
              skills
              </span>
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
      isLoading: loading.resources || loading.skill || loading.userSkillset,
      skills,
    }),
    {
      getSkills: getSkillsDataSaga,
      resetSkills: resetSkillsData,
      getResources: getResourcesSaga,
    },
  ),
)(Skillset)
