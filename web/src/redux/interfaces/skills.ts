import { IUserSkill } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'

export interface GetSkillsDataPayload {
  type: SkillsActionTypes.SAGA_GET_SKILLS
  skillsetId: number
}

export interface AddSkillsSaga {
  type: SkillsActionTypes.SAGA_ADD_SKILLS
  skillsetId: number
  skills: string[]
}

export interface RemoveSkillsSaga {
  type: SkillsActionTypes.SAGA_REMOVE_SKILLS
  skillIds: number[]
}


export interface SetSkillsData {
  type: SkillsActionTypes.SET_SKILLS_DATA
  payload: IUserSkill[]
}

export interface AddSkills {
  type: SkillsActionTypes.ADD_SKILLS
  payload: IUserSkill[]
}

export interface RemoveSkills {
  type: SkillsActionTypes.REMOVE_SKILLS
  payload: number[]
}

export type SkillsAction =
  GetSkillsDataPayload |
  AddSkillsSaga |
  RemoveSkillsSaga |
  AddSkills |
  SetSkillsData |
  RemoveSkills
