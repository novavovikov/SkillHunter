import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Filters, Page, UserSkill } from '../../components'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { getSkillsDataSaga } from '../../redux/actions/skills'
import { RootState } from '../../redux/reducers'
import { ResourcesState } from '../../redux/reducers/resources'
import { SkillsState } from '../../redux/reducers/skills'
import { UserState } from '../../redux/reducers/user'
import { SkillType } from '../../types'
import { H2, Loader } from '../../UI'
import * as s from './Library.css'

interface Params {
  profession: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState,
  skills: SkillsState
  resources: ResourcesState
  getSkills: (professionId: number) => void
}

class Library extends React.Component<Props> {
  componentDidMount (): void {
    this.getSkills()
  }

  componentDidUpdate ({ match }: Readonly<Props>): void {
    if (this.props.match.params.profession !== match.params.profession) {
      this.getSkills()
    }
  }

  getProfessionId = () => {
    const { user, match } = this.props

    if (!user.data) {
      return
    }

    const profession: any = user.data.professions.find(({ name }) => name === match.params.profession) || {}

    return profession.id
  }

  getSkills = () => {
    const professionId = this.getProfessionId()

    if (professionId) {
      this.props.getSkills(professionId)
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

    if (!match.params.profession) {
      return <Redirect to={ROUTES.HOME}/>
    }

    return (
      <Page>
        <div className={s.Library__header}>
          <H2 className={s.Library__title}>Library</H2>
          <Filters/>
        </div>

        {isLoading && (
          <div className={s.Library__loader}>
            <Loader/>
          </div>
        )}

        {!isLoading && data.map((skill: SkillType) => (
          <UserSkill
            key={skill.id}
            professionId={this.getProfessionId()}
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
