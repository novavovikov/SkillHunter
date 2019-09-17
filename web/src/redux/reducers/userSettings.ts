import { Reducer } from 'redux'
import { IUserSettings } from '../../types'
import { UserSettingsActionTypes } from '../actionTypes/userSettings'
import { UserSettingsAction } from '../interfaces/userSettings'

export type UserSettingsState = IUserSettings | null

const initState = null

export const userSettings: Reducer<UserSettingsState, UserSettingsAction> = (
  state: UserSettingsState = initState,
  action
) => {
  switch (action.type) {
    case UserSettingsActionTypes.SET_USER_SETTINGS:
      return action.payload
    default:
      return state
  }
}
