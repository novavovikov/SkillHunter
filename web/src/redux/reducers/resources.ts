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
              ...action.payload,
            }
          }

          return resource
        }),
      }
    case ResourcesActionTypes.CHANGE_RESOURCE_LIKE_STATUS:
      return Object.keys(state).
        reduce((acc, key) => {
          const resourcesList = state[key as any].map((userResource: UserResourceType) => {
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
            [key]: resourcesList,
          }
        }, {})
    case ResourcesActionTypes.REMOVE_RESOURCE:
      const { userSkill, id: resourceId } = action.payload

      if (!userSkill) {
        return state
      }

      return {
        ...state,
        [userSkill.id]: state[userSkill.id].filter(({ id }) => id !== resourceId),
      }
    default:
      return state
  }
}
