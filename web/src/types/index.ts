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
  type?: NotificationTypes,
  message: string
}

export interface NotificationTypeWithId extends NotificationType {
  id: string
}

export interface ResourceType {
  author: string[] | number
  created: string
  id: number
  link: string
  picture: string
  title: string
  userIdsLikes: number[],
  skills?: SkillType[]
}

export interface UserResourceType {
  author: string[] | number
  id: number
  isLiked: boolean
  likes: number
  resource: ResourceType
  skillsetId: number
  status: string | ResourceStatusTypes
  title: string
  type: string
  userSkill: UserSkillType
  viewOnly: boolean
  content: string
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
