import { Reducer } from 'redux'
import { LoadingActionTypes } from '../actionTypes/loading'
import { LoadingAction } from '../interfaces/loading'

export interface LoadingState {
  [key: string]: boolean
}

const initState = {
  resources: false,
  addResource: false,
  skill: false,
  userSkill: false
}

export const loading: Reducer<LoadingState, LoadingAction> = (state = initState, action) => {
  switch (action.type) {
    case LoadingActionTypes.ADD_LOADING:
      return {
        ...state,
        [action.payload]: true
      }
    case LoadingActionTypes.REMOVE_LOADING:
      return {
        ...state,
        [action.payload]: false
      }
    default:
      return state
  }
}
