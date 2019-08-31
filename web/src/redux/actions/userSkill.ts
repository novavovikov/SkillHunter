import { IUserSkill } from '../../types'
import { UserSkillActionTypes } from '../actionTypes/userSkill'
import { GetUserSkillSaga, SetUserSkill } from '../interfaces/userSkill'

export const getUserSkillSaga = (skillId: number): GetUserSkillSaga => ({
  type: UserSkillActionTypes.SAGA_GET_USER_SKILL,
  skillId,
})

export const setUserSkill = (data: IUserSkill): SetUserSkill => ({
  type: UserSkillActionTypes.SET_USER_SKILL,
  payload: data,
})
