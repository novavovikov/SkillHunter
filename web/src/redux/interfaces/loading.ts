import { LoadingActionTypes } from '../actionTypes/loading'

export interface AddLoading {
  type: LoadingActionTypes.ADD_LOADING
  payload: string
}

export interface RemoveLoading {
  type: LoadingActionTypes.REMOVE_LOADING
  payload: string
}

export type LoadingAction =
  AddLoading |
  RemoveLoading
