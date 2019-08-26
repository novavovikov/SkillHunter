import cookies from 'js-cookie'
import { IUser } from '../../types'
import { UserActionTypes } from '../actionTypes/user'
import {
  AddUserSkillsetSaga, CopyUserSkillsetSaga,
  GetUserDataSaga,
  RemoveUserSkillset,
  RemoveUserSkillsetSaga,
  SetUserData,
  UpdateUserData,
} from '../interfaces/user'
import { UserState } from '../reducers/user'

export const getUserDataSaga = (): GetUserDataSaga => ({
  type: UserActionTypes.SAGA_GET_USER,
})

export const addUserSkillsetSaga = (skillset: string, skills: string[], callback?: () => void): AddUserSkillsetSaga => ({
  type: UserActionTypes.SAGA_ADD_USER_SKILLSET,
  skillset,
  skills,
  callback
})

export const copyUserSkillsetSaga = (source: string, target: string): CopyUserSkillsetSaga => ({
  type: UserActionTypes.SAGA_COPY_USER_SKILLSET,
  source,
  target,
})

export const removeUserSkillsetSaga = (skillsetId: number): RemoveUserSkillsetSaga => ({
  type: UserActionTypes.SAGA_REMOVE_USER_SKILLSET,
  skillsetId,
})

export const logoutUser = (): SetUserData => {
  cookies.remove('authToken', {
    domain: window.location.hostname === 'localhost' ? 'localhost' : 'skillhunter.io',
  })

  return {
    type: UserActionTypes.SET_USER_DATA,
    payload: null,
  }
}

export const setUserData = (data: UserState): SetUserData => ({
  type: UserActionTypes.SET_USER_DATA,
  payload: data,
})

export const updateUserData = (data: Partial<IUser>): UpdateUserData => ({
  type: UserActionTypes.UPDATE_USER_DATA,
  payload: data,
})

export const removeUserSkillset = (skillsetId: number): RemoveUserSkillset => ({
  type: UserActionTypes.REMOVE_USER_SKILLSET,
  payload: skillsetId,
})
