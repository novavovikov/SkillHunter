import { IUser } from '../types'

export const getSkillsetIdFromUserData = (
  skillsetName: string,
  userData: IUser | null
) => {
  if (!userData) {
    return null
  }

  const skillset = userData.skillsets.find(({ name }) => name === skillsetName)

  if (skillset) {
    return skillset.id
  }

  return null
}
