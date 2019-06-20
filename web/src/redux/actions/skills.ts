import { SkillType } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'
import {
  AddSkills, AddSkillsByProfessionId,
  AddSkillsRequestType,
  GetSkillsData,
  SetSkillsData,
  SetSkillsLoadingStatus,
} from '../interfaces/skills'

export const getSkillsData = (professionId: number): GetSkillsData => ({
  type: SkillsActionTypes.SAGA_GET_SKILLS,
  payload: professionId,
})

export const addSkillsByProfessionId = (data: AddSkillsRequestType): AddSkillsByProfessionId => ({
  type: SkillsActionTypes.SAGA_ADD_SKILLS,
  payload: data,
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
