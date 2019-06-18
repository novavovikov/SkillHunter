import * as React from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Filters, Page, Skill } from '../../components'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { SkillType } from '../../types'
import { H2 } from '../../UI'
import { ajax } from '../../utils/ajax'
import * as s from './Library.css'

interface Params {
  profession: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState,
}

interface State {
  skills: SkillType[]
}

class Library extends React.Component<Props, State> {
  state = {
    skills: [],
  }

  componentDidMount (): void {
    this.getSkills()
  }

  componentDidUpdate ({ match }: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
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
      ajax.
        get(`user/skills/${professionId}`).
        then(({ data }) => {
          this.setState({
            skills: data.map(({ skill }: any) => skill),
          })
        })
    }
  }

  getRedirectUrl = (): string => {
    const {
      user: { data: userData },
    } = this.props

    if (!userData || !userData.professions.length) {
      return ROUTES.INTRODUCTION
    }

    return `${ROUTES.LIBRARY}/${userData.professions[0].name}`
  }

  render () {
    const { match } = this.props

    if (!match.params.profession) {
      return <Redirect to={this.getRedirectUrl()}/>
    }

    const { skills } = this.state

    return (
      <Page>
        <div className={s.Library__header}>
          <H2 className={s.Library__title}>Library</H2>
          <Filters/>
        </div>

        {skills.map((skill: SkillType) => (
          <Skill
            key={skill.id}
            data={skill}
            professionId={this.getProfessionId()}
          />
        ))}
      </Page>
    )
  }
}

export default compose(
  withUser,
  withRouter,
)(Library)
