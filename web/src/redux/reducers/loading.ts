import { Reducer } from 'redux'
import { LoadingActionTypes } from '../actionTypes/loading'
import { LoadingAction } from '../interfaces/loading'

export interface LoadingState {
  user: boolean
  userSkillset: boolean
  userSkill: boolean
  resources: boolean
  skill: boolean
  addResource: boolean
}

const initState = {
  user: false,
  userSkillset: false,
  userSkill: false,
  resources: false,
  skill: false,
  addResource: false
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
