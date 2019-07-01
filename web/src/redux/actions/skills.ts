import { SkillType } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'
import {
  AddSkills,
  AddSkillsSaga,
  GetSkillsDataPayload,
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
