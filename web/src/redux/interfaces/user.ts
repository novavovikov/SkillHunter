import { UserActionTypes } from '../actionTypes/user'
import { UserState } from '../reducers/user'

export interface GetUser {
  type: UserActionTypes.SAGA_GET_USER
}

export interface SetUser {
  type: UserActionTypes.SET_USER,
  payload: UserState
}

export type UserAction =
  GetUser |
  SetUser
