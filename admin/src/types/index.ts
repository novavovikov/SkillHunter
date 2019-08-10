export enum EResourceStatus {
  Backlog = 'Backlog',
  Plan = 'Plan',
  Done = 'Done'
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
  userResources: IUserResource[]
}

export interface iSkillset {
  id: number
  created: string
  name: string
  accepted: boolean,
  userSkills: IUserSkill[]
}

export interface iUser {
  created: string
  email: string
  facebookId: number | null
  googleId: string
  id: number
  locale: string
  name: string
  picture: string
  role: 'USER' | 'ADMIN'
  skillsets: iSkillset[]
}
