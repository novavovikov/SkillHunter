import { UserActionTypes } from '../actionTypes/user'

export interface GetUserData {
  type: UserActionTypes.SAGA_GET_USER
}

export interface SetUserData {
  type: UserActionTypes.SET_USER_DATA,
  payload: any
}


export interface SetUserLoadingStatus {
  type: UserActionTypes.SET_USER_LOADING_STATUS,
  payload: boolean
}

export interface UpdateUserData {
  type: UserActionTypes.UPDATE_USER_DATA,
  payload: any
}

export type UserAction =
  GetUserData |
  SetUserData |
  SetUserLoadingStatus |
  UpdateUserData
