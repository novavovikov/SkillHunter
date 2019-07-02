import { Reducer } from 'redux'
import { SkillType } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'
import { SkillsAction } from '../interfaces/skills'

export interface SkillsState {
  isLoading: boolean
  data: SkillType[]
}

const initState = {
  isLoading: false,
  data: [],
}

export const skills: Reducer<SkillsState, SkillsAction> = (state = initState, action) => {
  switch (action.type) {
    case SkillsActionTypes.SET_SKILLS_DATA:
      return {
        ...state,
        data: action.payload,
      }
    case SkillsActionTypes.ADD_SKILLS:
      return {
        ...state,
        data: [...action.payload, ...state.data],
      }
    case SkillsActionTypes.SET_SKILLS_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      }
    case SkillsActionTypes.REMOVE_SKILLS:
      return {
        ...state,
        data: state.data.filter(({ id }) => !action.payload.includes(id))
      }
    default:
      return state
  }
}
