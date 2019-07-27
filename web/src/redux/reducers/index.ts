import { combineReducers } from 'redux'
import { IUserSkill } from '../../types'
import { loading, LoadingState } from './loading'
import { notifications, NotificationState } from './notifications'
import { resources, ResourcesState } from './resources'
import { skills } from './skills'
import { user, UserState } from './user'

export interface RootState {
  notifications: NotificationState
  user: UserState
  skills: IUserSkill[]
  resources: ResourcesState
  loading: LoadingState
}

export default () => {
  return combineReducers<RootState>({
    notifications,
    user,
    skills,
    resources,
    loading,
  })
}
