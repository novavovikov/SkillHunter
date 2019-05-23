import { UserActionTypes } from '../actionTypes/user'
import { GetUser, SetUser } from '../interfaces/user'
import { UserState } from '../reducers/user'

export const getUser = (): GetUser => ({
  type: UserActionTypes.SAGA_GET_USER,
})

export const setUser = (data: UserState): SetUser => ({
  type: UserActionTypes.SET_USER,
  payload: data,
})
