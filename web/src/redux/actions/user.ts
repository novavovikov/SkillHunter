import cookies from 'js-cookie'
import { UserActionTypes } from '../actionTypes/user'
import {
  AddUserSkillSaga,
  GetUserDataSaga, RemoveUserSkillset,
  RemoveUserSkillsetSaga,
  SetUserData,
  SetUserLoadingStatus,
  UpdateUserData,
} from '../interfaces/user'

export const getUserDataSaga = (): GetUserDataSaga => ({
  type: UserActionTypes.SAGA_GET_USER,
})

export const addUserSkillSaga = (skills: string[]): AddUserSkillSaga => ({
  type: UserActionTypes.SAGA_ADD_USER_SKILL,
  payload: skills
})

export const removeUserSkillsetSaga = (skillsetId: number): RemoveUserSkillsetSaga => ({
  type: UserActionTypes.SAGA_REMOVE_USER_SKILLSET,
  payload: skillsetId
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

export const setUserData = (data: any): SetUserData => ({
  type: UserActionTypes.SET_USER_DATA,
  payload: data,
})

export const updateUserData = (data: any): UpdateUserData => ({
  type: UserActionTypes.UPDATE_USER_DATA,
  payload: data,
})

export const setUserLoadingStatus = (status: boolean): SetUserLoadingStatus => ({
  type: UserActionTypes.SET_USER_LOADING_STATUS,
  payload: status,
})

export const removeUserSkillset = (skillsetId: number): RemoveUserSkillset => ({
  type: UserActionTypes.REMOVE_USER_SKILLSET,
  payload: skillsetId,
})
