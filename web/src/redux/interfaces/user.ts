import { UserActionTypes } from '../actionTypes/user'
import { UserState } from '../reducers/user'

export interface GetUserDataSaga {
  type: UserActionTypes.SAGA_GET_USER
}

export interface AddUserSkillsetSaga {
  type: UserActionTypes.SAGA_ADD_USER_SKILLSET,
  skillset: string,
  skills: string[],
  callback?: () => void
}

export interface CopyUserSkillsetSaga {
  type: UserActionTypes.SAGA_COPY_USER_SKILLSET,
  source: string,
  target: string,
}

export interface RemoveUserSkillsetSaga {
  type: UserActionTypes.SAGA_REMOVE_USER_SKILLSET,
  skillsetId: number
}

export interface SetUserData {
  type: UserActionTypes.SET_USER_DATA,
  payload: UserState
}

export interface UpdateUserData {
  type: UserActionTypes.UPDATE_USER_DATA,
  payload: any
}

export interface RemoveUserSkillset {
  type: UserActionTypes.REMOVE_USER_SKILLSET,
  payload: number
}

export type UserAction =
  GetUserDataSaga |
  AddUserSkillsetSaga |
  CopyUserSkillsetSaga |
  RemoveUserSkillsetSaga |
  SetUserData |
  UpdateUserData |
  RemoveUserSkillset
