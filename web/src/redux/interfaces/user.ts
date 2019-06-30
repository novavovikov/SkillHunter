import { UserActionTypes } from '../actionTypes/user'

export interface GetUserDataSaga {
  type: UserActionTypes.SAGA_GET_USER
}

export interface RemoveUserSkillSetSaga {
  type: UserActionTypes.SAGA_REMOVE_USER_SKILL_SET,
  payload: number
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

export interface RemoveUserSkillSet {
  type: UserActionTypes.REMOVE_USER_SKILL_SET,
  payload: number
}

export type UserAction =
  GetUserDataSaga |
  RemoveUserSkillSetSaga |
  SetUserData |
  SetUserLoadingStatus |
  UpdateUserData |
  RemoveUserSkillSet
