import { combineReducers } from 'redux'
import { user, UserState } from './user'
import { skills, SkillsState } from './skills'
import { resources, ResourcesState } from './resources'

export interface RootState {
  user: UserState
  skills: SkillsState
  resources: ResourcesState
}

export default () => {
  return combineReducers<RootState>({
    user,
    skills,
    resources,
  })
}
