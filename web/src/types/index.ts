import { NotificationTypes } from '../constants/notification'

export enum ResourceStatusTypes {
  Backlog = 'Backlog',
  Plan = 'Plan',
  Done = 'Done'
}

export interface NotificationType {
  type: NotificationTypes,
  message: string | number
}

export interface ResourceType {
  id: number
  professionId: number
  skillId: number
  created: string
  icon: string
  link: string
  title: string
  type: string
  status: ResourceStatusTypes
  userIdsLikes: number[]
  likes: number
  isLiked: boolean
}

export interface SkillType {
  id: number
  name: string
  created: string
  accepted: boolean
  professionId: number
}

export interface ProfessionType {
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
  professions: ProfessionType[]
}
