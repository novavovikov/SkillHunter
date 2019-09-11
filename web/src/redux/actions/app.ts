import { AppActionTypes } from '../actionTypes/app'
import { UpdateAppData } from '../interfaces/app'

export const updateAppData = (data: any): UpdateAppData => ({
  type: AppActionTypes.UPDATE_APP_DATA,
  payload: data,
})
