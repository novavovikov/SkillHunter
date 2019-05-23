import { Reducer } from 'redux'
import { UserActionTypes } from '../actionTypes/user'
import { UserAction } from '../interfaces/user'

export interface UserState {
  isLoading: boolean
  isAuthenticated: boolean
  data: any
}

const initState = {
  isLoading: true,
  isAuthenticated: false,
  data: {}
}

export const user: Reducer<UserState, UserAction> = (state = initState, action) => {
  if (action.type === UserActionTypes.SET_USER) {
    return {
      ...state,
      ...action.payload
    }
  }

  return state
}
