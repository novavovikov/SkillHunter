import { NotificationTypes } from '../constants/notification'

export enum ResourceStatusTypes {
  Backlog = 'Backlog',
  Plan = 'Plan',
  Done = 'Done'
}

export interface SuggestionType {
  id: string,
  name: string
}

export interface NotificationType {
  type: NotificationTypes,
  message: string | number
}

export interface ResourceType {
  id: number
  skillsetId: number
  skillId: number
  created: string
  picture: string
  link: string
  title: string
  userTitle: string
  author: string
  type: string
  status: ResourceStatusTypes | string
  userIdsLikes: number[]
  likes: number
  isLiked: boolean
}

export interface SkillType {
  id: number
  name: string
  created: string
  accepted: boolean
  skillsetId: number
}

export interface UserSkillType {
  id: number
  skillsetId: number
  skill: SkillType
}

export interface SkillsetType {
  id: number
  name: string
  created: string
  accepted: boolean
}

export interface UserType {
  id: number
  created: string
  email: string
  locale: string
  name: string
  picture: string
  role: string
  skillsets: SkillsetType[]
}
