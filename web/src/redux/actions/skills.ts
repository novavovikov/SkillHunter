import { SkillType } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'
import {
  AddSkills,
  AddSkillsSaga,
  GetSkillsDataPayload, RemoveSkills,
  RemoveSkillsSaga,
  SetSkillsData,
  SetSkillsLoadingStatus,
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

export const setSkillsData = (data: SkillType[]): SetSkillsData => ({
  type: SkillsActionTypes.SET_SKILLS_DATA,
  payload: data,
})

export const addSkillToData = (data: SkillType[]): AddSkills => ({
  type: SkillsActionTypes.ADD_SKILLS,
  payload: data,
})

export const setSkillsLoadingStatus = (status: boolean): SetSkillsLoadingStatus => ({
  type: SkillsActionTypes.SET_SKILLS_LOADING_STATUS,
  payload: status,
})

export const removeSkills = (skillIds: number[]): RemoveSkills => ({
  type: SkillsActionTypes.REMOVE_SKILLS,
  payload: skillIds,
})
