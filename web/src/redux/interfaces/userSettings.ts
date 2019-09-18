import { UserSettingsActionTypes } from '../actionTypes/userSettings'
import { IUserSettings } from '../../types'

export interface GetUserSettingsSaga {
  type: UserSettingsActionTypes.SAGA_GET_USER_SETTINGS
}

export interface UpdateUserSettingsSaga {
  type: UserSettingsActionTypes.SAGA_UPDATE_USER_SETTINGS
  payload: Partial<IUserSettings>
}

export interface SetUserSettings {
  type: UserSettingsActionTypes.SET_USER_SETTINGS,
  payload: IUserSettings
}

export interface UpdateUserSettings {
  type: UserSettingsActionTypes.UPDATE_USER_SETTINGS,
  payload: Partial<IUserSettings>
}

export type UserSettingsAction =
  GetUserSettingsSaga |
  UpdateUserSettingsSaga |
  SetUserSettings |
  UpdateUserSettings
