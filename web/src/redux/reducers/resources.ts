import { act } from 'react-dom/test-utils'
import { Reducer } from 'redux'
import { ResourceType } from '../../types'
import { ResourcesActionTypes } from '../actionTypes/resources'
import { ResourcesAction } from '../interfaces/resources'

export interface ResourcesState {
  [id: number]: ResourceType[]
}

const initState = {}

export const resources: Reducer<ResourcesState, ResourcesAction> = (state = initState, action) => {
  switch (action.type) {
    case ResourcesActionTypes.SET_RESOURCES:
      return action.payload
    case ResourcesActionTypes.ADD_RESOURCE:
      const resourceList = state[action.payload.skillId] || []

      return {
        ...state,
        [action.payload.skillId]: [action.payload, ...resourceList]
      }
    case ResourcesActionTypes.REMOVE_RESOURCE:
      const { skillId, resourceId } = action.payload

      return {
        ...state,
        [skillId]: state[skillId].filter(({ id }) => id !== resourceId)
      }
    default:
      return state
  }
}
