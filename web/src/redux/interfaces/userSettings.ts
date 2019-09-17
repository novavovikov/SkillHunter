import { UserSettingsActionTypes } from '../actionTypes/userSettings'
import { IUserSettings } from '../../types'

export interface GetUserSettingsDataSaga {
  type: UserSettingsActionTypes.SAGA_GET_USER_SETTINGS
}

export interface SetUserSettings {
  type: UserSettingsActionTypes.SET_USER_SETTINGS,
  payload: IUserSettings
}

export type UserSettingsAction =
  GetUserSettingsDataSaga |
  SetUserSettings
