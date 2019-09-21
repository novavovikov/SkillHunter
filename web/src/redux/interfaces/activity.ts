import { ActivityActionTypes } from '../actionTypes/activity'
import { IActivityByResources } from '../../types'

export interface SetSkillActivityPayload {
  skillId: number
  data: IActivityByResources
}

export interface GetSkillsetActivitySaga {
  type: ActivityActionTypes.SAGA_GET_SKILLSET_ACTIVITY
  payload: number
}

export interface GetSkillActivitySaga {
  type: ActivityActionTypes.SAGA_GET_SKILL_ACTIVITY
  payload: number
}

export interface SetSkillsetActivity {
  type: ActivityActionTypes.SET_SKILLSET_ACTIVITY
  payload: IActivityByResources
}

export interface SetSkillActivity {
  type: ActivityActionTypes.SET_SKILL_ACTIVITY
  payload: SetSkillActivityPayload
}

export type ActivityAction =
  GetSkillsetActivitySaga |
  GetSkillActivitySaga |
  SetSkillsetActivity |
  SetSkillActivity
