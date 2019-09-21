import { ActivityActionTypes } from '../actionTypes/activity'
import { IActivityByResources } from '../../types'
import {
  GetSkillActivitySaga,
  GetSkillsetActivitySaga,
  SetSkillActivity,
  SetSkillActivityPayload,
  SetSkillsetActivity,
} from '../interfaces/activity'

export const getSkillsetActivitySaga = (skillsetId: number): GetSkillsetActivitySaga => ({
  type: ActivityActionTypes.SAGA_GET_SKILLSET_ACTIVITY,
  payload: skillsetId,
})

export const getSkillActivitySaga = (skillId: number): GetSkillActivitySaga => ({
  type: ActivityActionTypes.SAGA_GET_SKILL_ACTIVITY,
  payload: skillId,
})

export const setSkillsetActivity = (data: IActivityByResources): SetSkillsetActivity => ({
  type: ActivityActionTypes.SET_SKILLSET_ACTIVITY,
  payload: data,
})

export const setSkillActivity = (data: SetSkillActivityPayload): SetSkillActivity => ({
  type: ActivityActionTypes.SET_SKILL_ACTIVITY,
  payload: data,
})
