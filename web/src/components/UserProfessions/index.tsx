import * as React from 'react'
import { ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { addSkillsByProfessionId } from '../../redux/actions/skills'
import { AddSkillsRequestType } from '../../redux/interfaces/skills'
import { RootState } from '../../redux/reducers'
import { SkillsState } from '../../redux/reducers/skills'
import { UserState } from '../../redux/reducers/user'
import { Button } from '../../UI'
import * as s from './UserProfessions.css'

interface Props {
  user: UserState
  skills: SkillsState
  addSkills: (data: AddSkillsRequestType) => void
}

interface State {
  professionId: number | null
  skillValue: string
}

class UserProfessions extends React.Component<Props, State> {
  state = {
    professionId: null,
    skillValue: '',
  }

  handleSkillCreator = (e: any) => {
    this.setState({
      professionId: parseInt(e.target.value),
      skillValue: '',
    })
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      skillValue: e.target.value,
    })
  }

  addSkill = (e: FormEvent) => {
    e.preventDefault()
    const { addSkills } = this.props
    const { professionId, skillValue } = this.state

    if (professionId) {
      addSkills({
        professionId,
        skills: [skillValue],
      })

      this.setState({
        professionId: null,
        skillValue: ''
      })
    }
  }

  render () {
    const { user, skills } = this.props

    if (!user.data) {
      return null
    }

    const { professionId, skillValue } = this.state

    const isDisabled = !skillValue || skills.data.some(({ name }) => name.toLowerCase() === skillValue.toLowerCase())

    return (
      <div className={s.UserProfessions}>
        {user.data.professions.map(({ id, name }) => (
          <div
            key={id}
            className={s.UserProfessions__item}
          >
            <NavLink
              className={s.UserProfessions__link}
              activeClassName={s.UserProfessions__link_active}
              to={`${ROUTES.LIBRARY}/${name}`}
            >
              {name}
            </NavLink>

            <button
              className={s.UserProfessions__button}
              onClick={this.handleSkillCreator}
              value={id}
            >
              Add skill
            </button>
          </div>
        ))}

        {professionId && (
          <form onSubmit={this.addSkill}>
            <input
              type="text"
              value={skillValue}
              onChange={this.handleInput}
              style={{
                marginBottom: 5,
                width: '100%',
              }}
              autoFocus
            />

            <Button
              disabled={isDisabled}
            >
              Submit
            </Button>

            <Button
              style={{
                marginLeft: 10
              }}
            >
              Cancel
            </Button>
          </form>
        )}
      </div>
    )
  }
}

export default compose(
  withUser,
  connect(({ skills }: RootState) => ({
    skills,
  }), {
    addSkills: addSkillsByProfessionId,
  }),
)(UserProfessions)
