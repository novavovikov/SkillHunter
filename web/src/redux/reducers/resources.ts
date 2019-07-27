import { Reducer } from 'redux'
import { IUserResource } from '../../types'
import { ResourcesActionTypes } from '../actionTypes/resources'
import { ResourcesAction } from '../interfaces/resources'

export interface UserResourceState {
  total: number,
  data: IUserResource[]
}

export interface ResourcesState {
  [id: number]: UserResourceState
}

const initState = {}

export const resources: Reducer<ResourcesState, ResourcesAction> = (state = initState, action) => {
  switch (action.type) {
    case ResourcesActionTypes.SET_RESOURCES:
      return action.payload
    case ResourcesActionTypes.ADD_RESOURCE:
      const resourceList = state[action.payload.userSkill.id]

      return {
        ...state,
        [action.payload.userSkill.id]: {
          total: resourceList.total + 1,
          data: [action.payload, ...resourceList.data].slice(0, 5)
        },
      }
    case ResourcesActionTypes.UPDATE_RESOURCE:
      const userSkillId = action.payload.userSkill.id

      return {
        ...state,
        [userSkillId]: {
          ...state[userSkillId],
          data: state[userSkillId].data.map((resource: IUserResource) => {
            if (resource.id === action.payload.id) {
              return {
                ...resource,
                ...action.payload,
              }
            }

            return resource
          })
        },
      }
    case ResourcesActionTypes.CHANGE_RESOURCE_LIKE_STATUS:
      return Object.keys(state).
        reduce((acc, skillId: any) => {
          const resourcesList = state[skillId].data.map((userResource: IUserResource) => {
            const { id, ...data } = action.payload

            if (userResource.resource.id === id) {
              return {
                ...userResource,
                ...data,
              }
            }

            return userResource
          })

          return {
            ...acc,
            [skillId]: {
              ...state[skillId],
              data: resourcesList
            },
          }
        }, {} as any)
    case ResourcesActionTypes.REMOVE_RESOURCE:
      const { userSkill, id: resourceId } = action.payload

      if (!userSkill) {
        return state
      }

      return {
        ...state,
        [userSkill.id]: {
          total: state[userSkill.id].total - 1,
          data: state[userSkill.id].data.filter(({ id }) => id !== resourceId)
        }
      }
    default:
      return state
  }
}
