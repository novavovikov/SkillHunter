import * as React from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { compose } from 'redux'
import { Filters, Page, Skill } from '../../components'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { SkillType } from '../../types'
import { H2 } from '../../UI'
import * as s from './Library.css'

interface Params {
  profession: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState,
}

class Library extends React.Component<Props> {
  getSkills = () => {
    const { user, match } = this.props

    if (!user.data) {
      return []
    }

    const emptyProfession = { skills: [] }
    const profession = user.data.professions.find(({ name }) => name === match.params.profession) || emptyProfession

    return profession.skills
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

    const skills = this.getSkills()

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
