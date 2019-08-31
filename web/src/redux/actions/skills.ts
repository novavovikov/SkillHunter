import { ISkill, IUserSkill } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'
import {
  AddSkills,
  AddSkillsSaga,
  GetSkillsDataPayload, RemoveSkills,
  RemoveSkillsSaga,
  SetSkillsData,
} from '../interfaces/skills'

export const getSkillsDataSaga = (skillsetId: number): GetSkillsDataPayload => ({
  type: SkillsActionTypes.SAGA_GET_SKILLS,
  skillsetId,
})

export const addSkillsSaga = (skillsetId: number, skills: string[]): AddSkillsSaga => ({
  type: SkillsActionTypes.SAGA_ADD_SKILLS,
  skillsetId,
  skills,
})

export const removeSkillsSaga = (skillIds: number[]): RemoveSkillsSaga => ({
  type: SkillsActionTypes.SAGA_REMOVE_SKILLS,
  skillIds,
})

export const setSkillsData = (data: IUserSkill[]): SetSkillsData => ({
  type: SkillsActionTypes.SET_SKILLS_DATA,
  payload: data,
})

export const resetSkillsData = (): SetSkillsData => ({
  type: SkillsActionTypes.SET_SKILLS_DATA,
  payload: [],
})

export const addSkillToData = (data: IUserSkill[]): AddSkills => ({
  type: SkillsActionTypes.ADD_SKILLS,
  payload: data,
})

export const removeSkills = (skillIds: number[]): RemoveSkills => ({
  type: SkillsActionTypes.REMOVE_SKILLS,
  payload: skillIds,
})
