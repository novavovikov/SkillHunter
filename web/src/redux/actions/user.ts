import cookies from 'js-cookie'
import { UserActionTypes } from '../actionTypes/user'
import { GetUserData, SetUserData, SetUserLoadingStatus, UpdateUserData } from '../interfaces/user'

export const getUserDataSaga = (): GetUserData => ({
  type: UserActionTypes.SAGA_GET_USER,
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
