import { Reducer } from 'redux'
import { ISkill } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'
import { SkillsAction } from '../interfaces/skills'

const initState: ISkill[] = []

export const skills: Reducer<ISkill[], SkillsAction> = (state = initState, action) => {
  switch (action.type) {
    case SkillsActionTypes.SET_SKILLS_DATA:
      return action.payload
    case SkillsActionTypes.ADD_SKILLS:
      return [...action.payload, ...state]
    case SkillsActionTypes.REMOVE_SKILLS:
      return state.filter(({ id }) => !action.payload.includes(id))
    default:
      return state
  }
}
