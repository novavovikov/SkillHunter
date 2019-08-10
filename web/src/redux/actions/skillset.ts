import { ISkillset } from '../../types'
import { SkillsetActionTypes } from '../actionTypes/skillset'
import { AddSkillsetSaga } from '../interfaces/skillset'

export const addSkillsetSaga = (skillsets: [Partial<ISkillset>]): AddSkillsetSaga => ({
  type: SkillsetActionTypes.SAGA_ADD_SKILLSET,
  skillsets,
})
