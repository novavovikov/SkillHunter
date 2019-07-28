import { IUserResource, IUserSkill } from '../../types'
import { UserSkillActionTypes } from '../actionTypes/userSkill'
import {
  AddResourceToUserSkill,
  AddResourceToUserSkillSaga,
  AddResourceToUserSkillSagaPayload,
  GetUserSkillSaga,
  SetUserSkill,
} from '../interfaces/userSkill'

export const getUserSkillSaga = (skillId: number): GetUserSkillSaga => ({
  type: UserSkillActionTypes.SAGA_GET_USER_SKILL,
  skillId,
})

export const addResourceToUserSkillSaga = (data: AddResourceToUserSkillSagaPayload): AddResourceToUserSkillSaga => ({
  type: UserSkillActionTypes.SAGA_ADD_RESOURCE_TO_USER_SKILL,
  payload: data,
})

export const setUserSkill = (data: IUserSkill): SetUserSkill => ({
  type: UserSkillActionTypes.SET_USER_SKILL,
  payload: data,
})

export const addResourceToUserSkill = (data: IUserResource): AddResourceToUserSkill => ({
  type: UserSkillActionTypes.ADD_RESOURCE_TO_USER_SKILL,
  payload: data,
})
