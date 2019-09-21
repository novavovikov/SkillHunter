import { Reducer } from 'redux'
import { IActivityByResources } from '../../types'
import { ActivityActionTypes } from '../actionTypes/activity'
import { ActivityAction } from '../interfaces/activity'

export interface SkillActivityState {
  [skillId: string]: IActivityByResources
}

export interface ActivityState {
  skillset: IActivityByResources | null
  skill: SkillActivityState
}

const initState = {
  skillset: null,
  skill: {},
}

export const activity: Reducer<ActivityState, ActivityAction> = (state = initState, action) => {
  switch (action.type) {
    case ActivityActionTypes.SET_SKILLSET_ACTIVITY:
      return {
        ...state,
        skillset: action.payload,
      }
    case ActivityActionTypes.SET_SKILL_ACTIVITY:
      const { skillId, data } = action.payload

      return {
        ...state,
        skill: {
          ...state.skill,
          [skillId]: data,
        },
      }
    default:
      return state
  }
}
