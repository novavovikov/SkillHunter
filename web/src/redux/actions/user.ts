import cookies from 'js-cookie'
import { UserActionTypes } from '../actionTypes/user'
import { GetUserData, SetUserData, SetUserLoadingStatus } from '../interfaces/user'

export const getUserData = (): GetUserData => ({
  type: UserActionTypes.SAGA_GET_USER,
})

export const logoutUser = (): SetUserData => {
  cookies.remove('authToken', {
    domain: 'skillhunter.io'
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

export const setUserLoadingStatus = (status: boolean): SetUserLoadingStatus => ({
  type: UserActionTypes.SET_USER_LOADING_STATUS,
  payload: status,
})
