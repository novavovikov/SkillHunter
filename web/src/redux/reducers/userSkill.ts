import { Reducer } from 'redux'
import { IUserSkill } from '../../types'
import { UserSkillActionTypes } from '../actionTypes/userSkill'
import { UserSkillAction } from '../interfaces/userSkill'

export type UserSkillState = IUserSkill | null

const initState: UserSkillState = null

export const userSkill: Reducer<UserSkillState, UserSkillAction> = (state = initState, action) => {
  switch (action.type) {
    case UserSkillActionTypes.SET_USER_SKILL:
      return action.payload
    case UserSkillActionTypes.ADD_RESOURCE_TO_USER_SKILL:
      if (!state) {
        return state
      }

      return {
        ...state,
        userResources: [action.payload, ...state.userResources]
      }
    default:
      return state
  }
}
