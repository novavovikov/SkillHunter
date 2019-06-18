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
}

export interface Profession {
  id: number
  name: string
  created: string
  accepted: boolean
}

export interface User {
  id: number
  created: string
  email: string
  locale: string
  name: string
  picture: string
  role: string
  professions: Profession[]
}
