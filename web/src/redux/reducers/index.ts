import { combineReducers } from 'redux'
import { IUserSkill } from '../../types'
import { app, AppState } from './app'
import { loading, LoadingState } from './loading'
import { notifications, NotificationState } from './notifications'
import { recommendedResources, RecommendedResourcesState } from './recommendedResources'
import { resources, ResourcesState } from './resources'
import { skills } from './skills'
import { user, UserState } from './user'
import { userSkill, UserSkillState } from './userSkill'

export interface RootState {
  app: AppState
  notifications: NotificationState
  user: UserState
  skills: IUserSkill[]
  userSkill: UserSkillState
  resources: ResourcesState
  recommendedResources: RecommendedResourcesState
  loading: LoadingState
}

export default () => {
  return combineReducers<RootState>({
    app,
    notifications,
    user,
    userSkill,
    skills,
    resources,
    recommendedResources,
    loading,
  })
}
