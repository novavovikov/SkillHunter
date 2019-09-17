import { UserSettingsActionTypes } from '../actionTypes/userSettings'
import { GetUserSettingsDataSaga, SetUserSettings } from '../interfaces/userSettings'
import { IUserSettings } from '../../types'

export const getUserSettingsDataSaga = (): GetUserSettingsDataSaga => ({
  type: UserSettingsActionTypes.SAGA_GET_USER_SETTINGS,
})

export const setUserSettings = (data: IUserSettings): SetUserSettings => ({
  type: UserSettingsActionTypes.SET_USER_SETTINGS,
  payload: data
})
