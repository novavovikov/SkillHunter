import { AppActionTypes } from '../actionTypes/app'

export interface UpdateAppData {
  type: AppActionTypes.UPDATE_APP_DATA
  payload: any
}

export type AppAction =
  UpdateAppData
