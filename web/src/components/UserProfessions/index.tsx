import * as React from 'react'
import { ChangeEvent, FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { Button } from '../../UI'
import { ajax } from '../../utils/ajax'
import * as s from './UserProfessions.css'

interface Props {
  user: UserState
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
    const { professionId, skillValue } = this.state

    ajax.post('user/skills', {
      professionId,
      skills: [skillValue],
    })
  }

  render () {
    const { user } = this.props

    if (!user.data) {
      return null
    }

    const { professionId, skillValue } = this.state

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
                width: '100%'
              }}
            />

            <Button disabled={!skillValue}>
              Submit
            </Button>
          </form>
        )}
      </div>
    )
  }
}

export default withUser(UserProfessions)
