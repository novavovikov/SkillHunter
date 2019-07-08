import { combineReducers } from 'redux'
import { notifications, NotificationState } from './notifications'
import { resources, ResourcesState } from './resources'
import { skills, SkillsState } from './skills'
import { user, UserState } from './user'

export interface RootState {
  notifications: NotificationState
  user: UserState
  skills: SkillsState
  resources: ResourcesState
}

export default () => {
  return combineReducers<RootState>({
    notifications,
    user,
    skills,
    resources,
  })
}
