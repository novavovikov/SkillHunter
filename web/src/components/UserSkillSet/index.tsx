import React from 'react'
import withClickOutside from 'react-click-outside'
import { connect } from 'react-redux'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { RootState } from '../../redux/reducers'
import { SkillsState } from '../../redux/reducers/skills'
import { UserState } from '../../redux/reducers/user'
import { Animation, Icon, Popup } from '../../UI'
import { RemoveSkillSet, SkillSetCreator } from '../index'
import * as s from './UserSkillSet.css'

const skillSetInitialState = {
  id: null,
  name: '',
}

interface Params {
  profession: string
}

interface SkillSetType {
  id: number | null
  name: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
  skills: SkillsState
}

interface State {
  isOpen: boolean
  skillSet: SkillSetType
}

class UserSkillSet extends React.Component<Props, State> {
  state = {
    isOpen: false,
    skillSet: skillSetInitialState,
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

  openRemovePopup = (id: number, name: string) => {
    this.setState({
      isOpen: false,
      skillSet: { id, name },
    })
  }

  closeRemovePopup = () => {
    this.setState({
      skillSet: skillSetInitialState,
    })
  }

  render () {
    const { user, match } = this.props

    if (!user.data) {
      return null
    }

    const { isOpen, skillSet } = this.state

    return (
      <div className={s.UserSkillSet}>
        <button
          className={s.UserSkillSet__selected}
          onClick={this.toggleList}
        >
          <Icon
            type="user"
            className={s.UserSkillSet__userIcon}
          />
          {match.params.profession}
          <Icon
            type={isOpen ? 'arrow-up' : 'arrow-down'}
            className={s.UserSkillSet__selectedArrow}
          />
        </button>

        <Animation.Dropdown in={isOpen}>
          <div className={s.UserSkillSet__list}>
            {user.data.professions.map(({ id, name }) => (
              <div
                key={id}
                className={s.UserSkillSet__item}
              >
                <NavLink
                  to={`${ROUTES.SKILL_SET}/${name}`}
                  className={s.UserSkillSet__link}
                  activeClassName={s.UserSkillSet__link_active}
                  onClick={this.closeList}
                >
                  {name}
                </NavLink>

                {match.params.profession !== name && (
                  <button
                    className={s.UserSkillSet__remove}
                    onClick={() => this.openRemovePopup(id, name)}
                  >
                    <Icon type="bin"/>
                  </button>
                )}
              </div>
            ))}

            <SkillSetCreator/>
          </div>
        </Animation.Dropdown>

        <Popup
          isOpen={!!skillSet.id}
          onClose={this.closeRemovePopup}
        >
          <RemoveSkillSet
            skillSetId={skillSet.id}
            onClose={this.closeRemovePopup}
          >
            <h5 className={s.UserSkillSet__title}>
              Delete skillset?
            </h5>
            {skillSet.name}
          </RemoveSkillSet>
        </Popup>
      </div>
    )
  }
}

export default compose(
  withUser,
  withRouter,
  connect(({ skills }: RootState) => ({ skills }),
  ),
)(withClickOutside(UserSkillSet))
