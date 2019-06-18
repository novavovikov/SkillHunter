import { NotificationTypes } from '../constants/notification'

export interface NotificationType {
  type: NotificationTypes,
  message: string | number
}

export interface ResourceType {
  id: number
  created: string
  icon: string
  link: string
  title: string
  type: string
  userIdsLikes: number[]
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
