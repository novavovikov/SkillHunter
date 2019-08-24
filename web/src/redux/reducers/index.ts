import { combineReducers } from 'redux'
import { IUserSkill } from '../../types'
import { loading, LoadingState } from './loading'
import { notifications, NotificationState } from './notifications'
import { recommendedResources, RecommendedResourcesState } from './recommendedResources'
import { resources, ResourcesState } from './resources'
import { skills } from './skills'
import { user, UserState } from './user'
import { userSkill, UserSkillState } from './userSkill'

export interface RootState {
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
    notifications,
    user,
    userSkill,
    skills,
    resources,
    recommendedResources,
    loading,
  })
}
