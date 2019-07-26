import { ENotifications } from '../constants/notification'

export enum EResourceStatus {
  Backlog = 'Backlog',
  Plan = 'Plan',
  Done = 'Done'
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
  picture: string
  title: string
  userIdsLikes: number[],
  skills?: ISkill[]
}

export interface IUserResource {
  author: string[] | number
  id: number
  isLiked: boolean
  likes: number
  resource: IResource
  skillsetId: number
  status: string | EResourceStatus
  title: string
  type: string
  userSkill: IUserSkill
  viewOnly: boolean
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
}

export interface IUser {
  id: number
  created: string
  email: string
  locale: string
  name: string
  picture: string
  role: string
  skillsets: ISkillset[]
}
