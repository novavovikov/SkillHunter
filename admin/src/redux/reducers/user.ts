import { Reducer } from 'redux'
import { UserActionTypes } from '../actionTypes/user'
import { UserAction } from '../interfaces/user'

export interface UserState {
  isLoading: boolean
  data: any
}

const initState = {
  isLoading: false,
  data: null,
}

export const user: Reducer<UserState, UserAction> = (state = initState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA:
      return {
        ...state,
        data: action.payload,
      }
    case UserActionTypes.SET_USER_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      }
    case UserActionTypes.UPDATE_USER_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      }
    default:
      return state
  }
}
