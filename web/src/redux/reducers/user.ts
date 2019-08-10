import { Reducer } from 'redux'
import { IUser } from '../../types'
import { UserActionTypes } from '../actionTypes/user'
import { UserAction } from '../interfaces/user'

export type UserState = IUser | null

const initState = null

export const user: Reducer<UserState, UserAction> = (state: UserState = initState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_DATA:
      return action.payload
    case UserActionTypes.UPDATE_USER_DATA:
      if (!action.payload) {
        return state
      }

      if (!state) {
        return action.payload
      }

      return {
        ...state,
        ...action.payload,
      }
    case UserActionTypes.REMOVE_USER_SKILLSET:
      if (!state) {
        return state
      }

      return {
        ...state,
        skillsets: state.skillsets.filter(({ id }) => id !== action.payload),
      }
    default:
      return state
  }
}
