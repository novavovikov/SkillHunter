import { LoadingActionTypes } from '../actionTypes/loading'
import { AddLoading, RemoveLoading } from '../interfaces/loading'

export const addLoading = (name: string): AddLoading => ({
  type: LoadingActionTypes.ADD_LOADING,
  payload: status,
})

export const removeLoading = (name: string): RemoveLoading => ({
  type: LoadingActionTypes.REMOVE_LOADING,
  payload: status,
})
