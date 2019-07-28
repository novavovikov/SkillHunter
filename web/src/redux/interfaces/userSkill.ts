import { IUserResource, IUserSkill } from '../../types'
import { UserSkillActionTypes } from '../actionTypes/userSkill'

export interface AddResourceToUserSkillSagaPayload {
  skillsetId: number
  skillId: number
  data: Partial<IUserResource>
}

export interface GetUserSkillSaga {
  type: UserSkillActionTypes.SAGA_GET_USER_SKILL,
  skillId: number
}

export interface AddResourceToUserSkillSaga {
  type: UserSkillActionTypes.SAGA_ADD_RESOURCE_TO_USER_SKILL,
  payload: AddResourceToUserSkillSagaPayload
}

export interface SetUserSkill {
  type: UserSkillActionTypes.SET_USER_SKILL
  payload: IUserSkill
}

export interface AddResourceToUserSkill {
  type: UserSkillActionTypes.ADD_RESOURCE_TO_USER_SKILL
  payload: IUserResource
}

export type UserSkillAction =
  GetUserSkillSaga |
  AddResourceToUserSkillSaga |
  SetUserSkill |
  AddResourceToUserSkill
