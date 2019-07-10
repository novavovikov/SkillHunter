import { Reducer } from 'redux'
import { SkillType } from '../../types'
import { SkillsActionTypes } from '../actionTypes/skills'
import { SkillsAction } from '../interfaces/skills'

const initState: SkillType[] = []

export const skills: Reducer<SkillType[], SkillsAction> = (state = initState, action) => {
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
