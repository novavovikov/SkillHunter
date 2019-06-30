import { SkillType } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'

export interface AddSkillsRequestPayload {
  professionId: number
  skills: string[]
}

export interface GetSkillsDataPayload {
  type: SkillsActionTypes.SAGA_GET_SKILLS,
  payload: number
}

export interface AddSkillsByProfessionId {
  type: SkillsActionTypes.SAGA_ADD_SKILLS,
  payload: AddSkillsRequestPayload
}

export interface SetSkillsData {
  type: SkillsActionTypes.SET_SKILLS_DATA,
  payload: SkillType[]
}

export interface AddSkills {
  type: SkillsActionTypes.ADD_SKILLS,
  payload: SkillType[]
}

export interface SetSkillsLoadingStatus {
  type: SkillsActionTypes.SET_SKILLS_LOADING_STATUS,
  payload: boolean
}

export type SkillsAction =
  GetSkillsDataPayload |
  AddSkillsByProfessionId |
  AddSkills |
  SetSkillsData |
  SetSkillsLoadingStatus