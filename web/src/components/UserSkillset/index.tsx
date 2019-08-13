import React from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { UserState } from '../../redux/reducers/user'
import { IconTypes } from '../../types'
import { Animation, Icon, OutsideClickWrapper, Popup } from '../../UI'
import { analytics } from '../../utils/analytics'
import { RemoveSkillset, SkillsetCreator } from '../index'
import * as s from './UserSkillset.css'

const skillSetInitialState = {
  id: null,
  name: '',
}

interface Params {
  skillset: string
}

interface ISkillset {
  id: number | null
  name: string
}

interface Props extends RouteComponentProps<Params> {
  user: UserState
  onChange?: () => void
}

interface State {
  isOpen: boolean
  skillSet: ISkillset
}

class UserSkillset extends React.Component<Props, State> {
  state = {
    isOpen: false,
    skillSet: skillSetInitialState,
  }

  closeList = () => {
    this.setState({
      isOpen: false,
    })
  }

  handleSkillset = (skillset: string) => {
    const { onChange } = this.props

    analytics({
      event: 'click_other_skillset',
      skillset_name: skillset,
      category: 'skillset'
    })

    this.closeList()

    if (typeof onChange === 'function') {
      onChange()
    }
  }

  toggleList = () => {
    const { isOpen } = this.state

    this.setState({
      isOpen: !isOpen,
    })

    if (!isOpen) {
      analytics({
        event: 'click_skillset_dropdown',
        category: 'skillset'
      })
    }
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

    if (!user) {
      return null
    }

    const { isOpen, skillSet } = this.state

    return (
      <OutsideClickWrapper
        className={s.UserSkillset}
        handler={this.closeList}
      >
        <button
          className={s.UserSkillset__selected}
          onClick={this.toggleList}
        >
          <Icon
            type={IconTypes.user}
            className={s.UserSkillset__userIcon}
          />
          {match.params.skillset}
          <Icon
            type={isOpen ? IconTypes.arrowUp : IconTypes.arrowDown}
            className={s.UserSkillset__selectedArrow}
          />
        </button>

        <Animation.Dropdown in={isOpen}>
          <div className={s.UserSkillset__list}>
            <Scrollbar
              autoHeight
              autoHeightMax={150}
            >
              {user.skillsets.map(({ id, name }) => (
                <div
                  key={id}
                  className={s.UserSkillset__item}
                >
                  <NavLink
                    to={`${ROUTES.SKILLSET}/${name}`}
                    className={s.UserSkillset__link}
                    activeClassName={s.UserSkillset__link_active}
                    onClick={() => this.handleSkillset(name)}
                  >
                    {name}
                  </NavLink>

                  {match.params.skillset !== name && (
                    <button
                      className={s.UserSkillset__remove}
                      onClick={() => this.openRemovePopup(id, name)}
                    >
                      <Icon type={IconTypes.bin}/>
                    </button>
                  )}
                </div>
              ))}
            </Scrollbar>

            <div className={s.UserSkillset__create}>
              <SkillsetCreator/>
            </div>
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
      </OutsideClickWrapper>
    )
  }
}

export default compose(
  withUser,
  withRouter,
)(UserSkillset)
