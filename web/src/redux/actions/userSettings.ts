import { UserSettingsActionTypes } from '../actionTypes/userSettings'
import {
  GetUserSettingsSaga,
  SetUserSettings,
  UpdateUserSettings,
  UpdateUserSettingsSaga,
} from '../interfaces/userSettings'
import { IUserSettings } from '../../types'

export const getUserSettingsSaga = (): GetUserSettingsSaga => ({
  type: UserSettingsActionTypes.SAGA_GET_USER_SETTINGS,
})

export const updateUserSettingsSaga = (data: Partial<IUserSettings>): UpdateUserSettingsSaga => ({
  type: UserSettingsActionTypes.SAGA_UPDATE_USER_SETTINGS,
  payload: data,
})

export const setUserSettings = (data: IUserSettings): SetUserSettings => ({
  type: UserSettingsActionTypes.SET_USER_SETTINGS,
  payload: data
})

export const updateUserSettings = (data: Partial<IUserSettings>): UpdateUserSettings => ({
  type: UserSettingsActionTypes.UPDATE_USER_SETTINGS,
  payload: data,
})
