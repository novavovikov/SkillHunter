import { Reducer } from 'redux'
import { AppActionTypes } from '../actionTypes/app'
import { AppAction } from '../interfaces/app'

export interface AppState {
  statusCode: number | null
}

const initState = {
  statusCode: null
}

export const app: Reducer<AppState, AppAction> = (state = initState, action) => {
  switch (action.type) {
    case AppActionTypes.UPDATE_APP_DATA:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
