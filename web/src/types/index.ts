import articleIcon from '../components/ResourcePreviewInfo/icons/article.svg'
import bookIcon from '../components/ResourcePreviewInfo/icons/book.svg'
import mediaIcon from '../components/ResourcePreviewInfo/icons/media.svg'
import { ENotifications } from '../constants/notification'

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
  picture: string
  title: string
  userIdsLikes: number[],
  skills?: ISkill[]
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
  userResources: IUserResource[]
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
