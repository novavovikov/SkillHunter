import { Reducer } from 'redux'
import { UserResourceType } from '../../types'
import { ResourcesActionTypes } from '../actionTypes/resources'
import { ResourcesAction } from '../interfaces/resources'

export interface ResourcesState {
  [id: number]: UserResourceType[]
}

const initState = {}

export const resources: Reducer<ResourcesState, ResourcesAction> = (state = initState, action) => {
  switch (action.type) {
    case ResourcesActionTypes.SET_RESOURCES:
      return action.payload
    case ResourcesActionTypes.ADD_RESOURCE:
      const resourceList = state[action.payload.userSkill.id] || []

      return {
        ...state,
        [action.payload.userSkill.id]: [action.payload, ...resourceList],
      }
    case ResourcesActionTypes.UPDATE_RESOURCE:
      return {
        ...state,
        [action.payload.userSkill.id]: state[action.payload.userSkill.id].map((resource: UserResourceType) => {
          if (resource.id === action.payload.id) {
            return {
              ...resource,
              ...action.payload
            }
          }

          return resource
        })
      }
    case ResourcesActionTypes.CHANGE_RESOURCE_LIKE_STATUS:
      return Object.keys(state).
        reduce((acc, key) => {
          const resourcesList = state[key as any].map((resource: UserResourceType) => {
            if (resource.id === action.payload.id) {
              return {
                ...resource,
                ...action.payload
              }
            }

            return resource
          })

          return {
            ...acc,
            [key]: resourcesList
          }
        }, {})
    case ResourcesActionTypes.REMOVE_RESOURCE:
      const { skillId, resourceId } = action.payload

      return {
        ...state,
        [skillId]: state[skillId].filter(({ id }) => id !== resourceId),
      }
    default:
      return state
  }
}
