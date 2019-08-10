import { ISkillset } from '../../types'
import { SkillsetActionTypes } from '../actionTypes/skillset'

export interface AddSkillsetSaga {
  type: SkillsetActionTypes.SAGA_ADD_SKILLSET,
  skillsets: [Partial<ISkillset>]
}

export type UserAction = AddSkillsetSaga
