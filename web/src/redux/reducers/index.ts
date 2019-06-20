import { combineReducers } from 'redux'
import { skills, SkillsState } from './skills'
import { user, UserState } from './user'

export interface RootState {
  user: UserState
  skills: SkillsState
}

export default () => {
  return combineReducers<RootState>({
    user,
    skills,
  })
}
