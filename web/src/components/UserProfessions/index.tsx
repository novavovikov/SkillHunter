import React from 'react'
import withClickOutside from 'react-click-outside'
import { connect } from 'react-redux'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { compose } from 'redux'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { AddSkillsRequestPayload } from '../../redux/interfaces/skills'
import { RootState } from '../../redux/reducers'
import { SkillsState } from '../../redux/reducers/skills'
import { UserState } from '../../redux/reducers/user'
import { Icon } from '../../UI'
import { SkillSetCreator } from '../index'
import * as s from './UserProfessions.css'

interface Params {
  profession: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
  skills: SkillsState
  addSkills: (data: AddSkillsRequestPayload) => void
}

interface State {
  isOpen: boolean
}

class UserProfessions extends React.Component<Props, State> {
  state = {
    isOpen: false,
  }

  handleClickOutside () {
    this.closeList()
  }

  closeList = () => {
    this.setState({
      isOpen: false,
    })
  }

  toggleList = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render () {
    const { user, match } = this.props

    if (!user.data) {
      return null
    }

    const { isOpen } = this.state

    return (
      <div className={s.UserProfessions}>
        <button
          className={s.UserProfessions__selected}
          onClick={this.toggleList}
        >
          <Icon
            type="user"
            className={s.UserProfessions__userIcon}
          />
          {match.params.profession}
          <Icon
            type={isOpen ? 'arrow-up' : 'arrow-down'}
            className={s.UserProfessions__selectedArrow}
          />
        </button>

        <CSSTransition
          in={isOpen}
          timeout={300}
          unmountOnExit
          classNames={{
            enterActive: s.UserProfessions__enter,
            enterDone: s.UserProfessions__enter_active,
            exit: s.UserProfessions__exit,
            exitActive: s.UserProfessions__exit_active,
          }}
        >
          <div className={s.UserProfessions__list}>
            {user.data.professions.map(({ id, name }) => (
              <div
                key={id}
                className={s.UserProfessions__item}
              >
                <NavLink
                  to={`${ROUTES.SKILL_SET}/${name}`}
                  className={s.UserProfessions__link}
                  activeClassName={s.UserProfessions__link_active}
                  onClick={this.closeList}
                >
                  {name}
                </NavLink>

                <button className={s.UserProfessions__remove}>
                  <Icon type="bin"/>
                </button>
              </div>
            ))}

            <SkillSetCreator/>
          </div>
        </CSSTransition>
      </div>
    )
  }
}

export default compose(
  withUser,
  withRouter,
  connect(({ skills }: RootState) => ({ skills })),
)(withClickOutside(UserProfessions))
