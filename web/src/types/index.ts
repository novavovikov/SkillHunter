import { ENotifications } from '../constants/notification'

export interface IActivityByResources {
  Total: number
  Backlog: number
  Plan: number
  Done: number
}

export enum EResourceStatus {
  Backlog = 'Backlog',
  Plan = 'Plan',
  Done = 'Done'
}

export enum EResourceTypes {
  Article = 'article',
  Media = 'media',
  Book = 'book',
  Course = 'course',
}

export enum EUserRoles {
  Admin = 'ADMIN',
  User = 'USER',
}

export interface ISuggestion {
  id: string,
  name: string
}

export interface INotification {
  type?: ENotifications,
  message: string
}

export interface INotificationWithId extends INotification {
  id: string
}

export interface IResource {
  author: string[] | number
  created: string
  id: number
  link: string
  title: string
  userIdsLikes: number[],
  skills?: ISkill[]
  date: string | null
  image: string
  icon: string
  text: string
  accepted: boolean
}

export interface IUserResource {
  author: string | null
  id: number
  isLiked: boolean
  likes: number
  resource: IResource
  skillsetId: number
  status: string | EResourceStatus
  title: string
  type: EResourceTypes
  userSkill: IUserSkill
  viewOnly: boolean
  isAuthorized: boolean
}

export interface ISkill {
  id: number
  name: string
  created: string
  accepted: boolean
  skillsetId: number
}

export interface IUserSkill {
  id: number
  skillsetId: number
  skill: ISkill
}

export interface ISkillset {
  id: number
  name: string
  created: string
  accepted: boolean
  skills: ISkill
}

export interface IUser {
  id: number
  created: string
  email: string
  locale: string
  name: string
  picture: string
  role: EUserRoles
  skillsets: ISkillset[]
}

export interface IUserSettings {
  newsletter: boolean
  onboarding: boolean
  private: boolean
  push: boolean
}

export type IconSizes = 'free' | '18' | '24' | null

export enum IconTypes {
  user,
  bin,
  heart,
  heartFilled,
  share,
  dots,

  arrowUp,
  arrowDown,
  arrowLeft,
  arrowRight,

  close,
  add,
  remove,
  copy,

  facebook,
  twitter,
  linkedin,
  reddit,
  telegram,
  vk
}
