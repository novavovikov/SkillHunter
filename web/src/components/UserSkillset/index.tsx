import cn from 'classnames'
import React from 'react'
import Scrollbar from 'react-custom-scrollbars'
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { ROUTES } from '../../constants/routing'
import { withUser } from '../../providers/User'
import { EUserRoles, IconTypes, IUser } from '../../types'
import { Animation, Icon, OutsideClickWrapper } from '../../UI'
import { analytics } from '../../utils/analytics'
import { CopySkillset, RemoveSkillset, SkillsetCreator } from '../index'
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
  user: IUser
  onChange?: () => void
}

interface State {
  isOpen: boolean
  deletedSkillset: ISkillset
  copiedSkillset: ISkillset
}

class UserSkillset extends React.Component<Props, State> {
  state = {
    isOpen: false,
    deletedSkillset: skillSetInitialState,
    copiedSkillset: skillSetInitialState,
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
      deletedSkillset: { id, name },
    })
  }

  openCopyPopup = (id: number, name: string) => {
    this.setState({
      isOpen: false,
      copiedSkillset: { id, name },
    })
  }

  closeRemovePopup = () => {
    this.setState({
      deletedSkillset: skillSetInitialState,
    })
  }

  closeCopyPopup = () => {
    this.setState({
      copiedSkillset: skillSetInitialState,
    })
  }

  render () {
    const { user, match } = this.props

    if (!user) {
      return null
    }

    const { isOpen, deletedSkillset, copiedSkillset } = this.state

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
                    to={`${ROUTES.LIBRARY}/${name}`}
                    className={s.UserSkillset__link}
                    activeClassName={s.UserSkillset__link_active}
                    onClick={() => this.handleSkillset(name)}
                  >
                    {name}
                  </NavLink>

                  {match.params.skillset !== name && (
                    <button
                      className={cn(s.UserSkillset__control, s.UserSkillset__control_remove)}
                      onClick={() => this.openRemovePopup(id, name)}
                    >
                      <Icon type={IconTypes.bin}/>
                    </button>
                  )}

                  {user.role === EUserRoles.Admin && (
                    <button
                      className={cn(s.UserSkillset__control, s.UserSkillset__control_copy)}
                      onClick={() => this.openCopyPopup(id, name)}
                    >
                      <Icon type={IconTypes.copy}/>
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

        <RemoveSkillset
          isOpen={!!deletedSkillset.id}
          skillset={deletedSkillset}
          onClose={this.closeRemovePopup}
        />
        <CopySkillset
          isOpen={!!copiedSkillset.id}
          source={copiedSkillset}
          onClose={this.closeCopyPopup}
        />
      </OutsideClickWrapper>
    )
  }
}

export default compose(
  withUser,
  withRouter,
)(UserSkillset)
