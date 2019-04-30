import { Reducer } from 'redux'
import { AppActionTypes } from '../actionTypes/app'
import { AppAction } from '../actions/app'

export interface AppState {
  isInitialized: boolean
  error?: string | null
}

const initState = {
  isInitialized: false,
  error: ''
}

export const app: Reducer<AppState, AppAction> = (state = initState, action) => {
  switch (action.type) {
    case AppActionTypes.APP_INITIALIZED_SET: {
      return {
        ...state,
        isInitialized: true
      }
    }
    case AppActionTypes.APP_INITIALIZE_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
  }
  return state
}
