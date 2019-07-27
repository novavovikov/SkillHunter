import { IUser } from '../types'

export const getSkillsetFromUserData = (
  skillsetName: string,
  userData: IUser | null
) => {
  if (!userData) {
    return null
  }

  const skillset = userData.skillsets.find(({ name }) => name === skillsetName)

  if (!skillset) {
    return null
  }

  return skillset
}
