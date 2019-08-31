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
    default:
      return state
  }
}
