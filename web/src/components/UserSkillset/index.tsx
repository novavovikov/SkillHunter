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
import { RemoveSkillset, SkillsetCreator } from '../index'
import * as s from './UserSkillset.css'

const skillSetInitialState = {
  id: null,
  name: '',
}

interface Params {
  skillset: string
}

interface SkillsetType {
  id: number | null
  name: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
  skills: SkillsState
}

interface State {
  isOpen: boolean
  skillSet: SkillsetType
}

class UserSkillset extends React.Component<Props, State> {
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
      <div className={s.UserSkillset}>
        <button
          className={s.UserSkillset__selected}
          onClick={this.toggleList}
        >
          <Icon
            type="user"
            className={s.UserSkillset__userIcon}
          />
          {match.params.skillset}
          <Icon
            type={isOpen ? 'arrow-up' : 'arrow-down'}
            className={s.UserSkillset__selectedArrow}
          />
        </button>

        <Animation.Dropdown in={isOpen}>
          <div className={s.UserSkillset__list}>
            {user.data.skillsets.map(({ id, name }) => (
              <div
                key={id}
                className={s.UserSkillset__item}
              >
                <NavLink
                  to={`${ROUTES.SKILLSET}/${name}`}
                  className={s.UserSkillset__link}
                  activeClassName={s.UserSkillset__link_active}
                  onClick={this.closeList}
                >
                  {name}
                </NavLink>

                {match.params.skillset !== name && (
                  <button
                    className={s.UserSkillset__remove}
                    onClick={() => this.openRemovePopup(id, name)}
                  >
                    <Icon type="bin"/>
                  </button>
                )}
              </div>
            ))}

            <SkillsetCreator/>
          </div>
        </Animation.Dropdown>

        <Popup
          isOpen={!!skillSet.id}
          onClose={this.closeRemovePopup}
        >
          <RemoveSkillset
            skillSetId={skillSet.id}
            onClose={this.closeRemovePopup}
          >
            <h5 className={s.UserSkillset__title}>
              Delete skillset?
            </h5>
            {skillSet.name}
          </RemoveSkillset>
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
)(withClickOutside(UserSkillset))
