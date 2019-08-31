import { IUserSkill } from '../../types'
import { UserSkillActionTypes } from '../actionTypes/userSkill'

export interface GetUserSkillSaga {
  type: UserSkillActionTypes.SAGA_GET_USER_SKILL,
  skillId: number
}

export interface SetUserSkill {
  type: UserSkillActionTypes.SET_USER_SKILL
  payload: IUserSkill
}

export type UserSkillAction =
  GetUserSkillSaga |
  SetUserSkill
