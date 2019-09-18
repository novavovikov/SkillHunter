import React, { ChangeEvent, Component } from 'react'
import * as s from './NotificationSettings.css'
import { Checkbox, H3 } from '../../UI'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { getUserSettingsSaga, updateUserSettingsSaga } from '../../redux/actions/userSettings'
import { UserSettingsState } from '../../redux/reducers/userSettings'
import { IUserSettings } from '../../types'

const NOTIFICATION_SETTINGS = [
  {
    label: 'Email notifications',
    setting: 'newsletter',
  },
  {
    label: 'Push notifications',
    setting: 'push',
  },
]

interface Props {
  getUserSettings: () => void
  updateUserSettings: (data: Partial<IUserSettings>) => void
  userSettings: UserSettingsState
}

class NotificationSettings extends Component<Props> {
  componentDidMount (): void {
    const { userSettings, getUserSettings } = this.props

    if (!userSettings) {
      getUserSettings()
    }
  }

  handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { updateUserSettings } = this.props
    const { value, checked } = e.target

    updateUserSettings({
      [value as never]: checked,
    })
  }

  render () {
    const { userSettings } = this.props

    if (!userSettings) {
      return null
    }

    return (
      <div className={s.NotificationSettings}>
        <H3 className={s.NotificationSettings__title}>
          Notification Settings
        </H3>
        <p className={s.NotificationSettings__desc}>
          The settings below allow you to control how SkillHunter communicates with you.
        </p>

        {NOTIFICATION_SETTINGS.map(({ label, setting }) => (
          <div
            key={setting}
            className={s.NotificationSettings__item}
          >
            <Checkbox
              checked={userSettings[setting as never]}
              onChange={this.handleCheckbox}
              value={setting}
            >
              {label}
            </Checkbox>
          </div>
        ))}
      </div>
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
)(NotificationSettings)
