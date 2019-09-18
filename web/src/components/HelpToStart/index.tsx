import React, { Component } from 'react'
import cn from 'classnames'
import { Popup } from '../../UI'
import Video from './video'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { getUserSettingsSaga, updateUserSettingsSaga } from '../../redux/actions/userSettings'
import { UserSettingsState } from '../../redux/reducers/userSettings'
import * as s from './HelpToStart.css'
import { IUserSettings } from '../../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  userSettings: Partial<UserSettingsState>
  getUserSettings: () => void
  updateUserSettings: (data: Partial<IUserSettings>) => void
}

class HelpToStart extends Component<Props> {
  static defaultProps = {
    userSettings: {
      onboarding: false,
    },
  }

  componentDidMount (): void {
    const { userSettings } = this.props

    if (!userSettings) {
      this.props.getUserSettings()
    }
  }

  onClose = () => {
    const {
      updateUserSettings,
      onClose,
      isOpen,
    } = this.props

    if (isOpen) {
      return onClose()
    }

    return updateUserSettings({
      onboarding: false,
    })
  }

  render () {
    const { userSettings, isOpen } = this.props
    const isVisible = isOpen || (userSettings && userSettings!.onboarding)

    if (!isVisible) {
      return null
    }

    return (
      <Popup
        isOpen={isVisible}
        onClose={this.onClose}
      >
        <div className={s.HelpToStart}>
          <div className={s.HelpToStart__header}>
            <i className={s.HelpToStart__icon}/>
            <h3 className={s.HelpToStart__title}>
              Hi! Skillhunter helps you with improving your skills
            </h3>
          </div>

          <div className={s.HelpToStart__body}>
            <div className={cn(s.HelpToStart__section, s.HelpToStart__section_done)}>
              <h4 className={s.HelpToStart__title}>
                Add skillset and skills
              </h4>
              <p className={s.HelpToStart__text}>
                Profession, hobby or activity. Each skillset contains several skills
              </p>
            </div>

            <div
              className={cn(s.HelpToStart__section, s.HelpToStart__section_active)}
              data-step="2"
            >
              <h4 className={s.HelpToStart__title}>
                Add resources
              </h4>
              <p className={s.HelpToStart__text}>
                Each skill contains resources for self-development. <br/>
                Use button Add resource or recommendations
              </p>

              <Video name="add-source"/>
            </div>

            <div
              className={s.HelpToStart__section}
              data-step="3"
            >
              <h4 className={s.HelpToStart__title}>
                Follow your resource discovery plan
              </h4>
              <p className={s.HelpToStart__text}>
                Discovery resources in your lists and change status
              </p>

              <Video name="change-status"/>
            </div>
          </div>

          <div className={s.HelpToStart__footer}>
            <button
              className={s.HelpToStart__submit}
              onClick={this.onClose}
            >
              Got it, close it
            </button>
          </div>
        </div>
      </Popup>
    )
  }
}

export default compose(
  connect(
    ({ userSettings }: RootState) => ({ userSettings }),
    {
      getUserSettings: getUserSettingsSaga,
      updateUserSettings: updateUserSettingsSaga,
    },
  ),
)(HelpToStart)
