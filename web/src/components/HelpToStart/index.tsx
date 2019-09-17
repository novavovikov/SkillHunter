import React, { Component } from 'react'
import cn from 'classnames'
import { Popup } from '../../UI'
import Video from './video'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { getUserSettingsDataSaga } from '../../redux/actions/userSettings'
import { UserSettingsState } from '../../redux/reducers/userSettings'
import * as s from './HelpToStart.css'

interface Props {
  userSettings: UserSettingsState
  getUserSettingsData: () => void
}

class HelpToStart extends Component<Props> {
  componentDidMount (): void {
    this.props.getUserSettingsData()
  }

  resetState = () => {
    // this.setState({
    //   settings: null,
    // })
    //
    // ajax.put('user-settings', {
    //   onboarding: false,
    // })
  }

  render () {
    const { userSettings } = this.props

    if (!userSettings) {
      return null
    }

    console.log(2, userSettings)

    return (
      <Popup
        isOpen={userSettings.onboarding}
        onClose={this.resetState}
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
              onClick={this.resetState}
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
      getUserSettingsData: getUserSettingsDataSaga,
    },
  ),
)(HelpToStart)
