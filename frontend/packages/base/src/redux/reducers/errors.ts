import { ErrorActionTypes } from '../actionTypes/errors'
import { ErrorAction } from '../actions/app'
import { Reducer } from 'redux'

export interface ErrorState {}

export const errors: Reducer<ErrorState, ErrorAction> = (state = {}, action) => {
  switch (action.type) {
    case ErrorActionTypes.ERROR_CLEAR:
      return { ...state, [action.payload]: null }
    case ErrorActionTypes.ERROR_CLEAR_ALL:
      return {}
  }
  return state
}
