import { Reducer } from 'redux'
import { IResource } from '../../types'
import { RecommendedResourcesActionTypes } from '../actionTypes/recommendedResources'
import { RecommendedResourcesAction } from '../interfaces/recommendedResources'

export interface RecommendedResourcesState {
  [id: string]: IResource[]
}

const initState = {}

export const recommendedResources: Reducer<RecommendedResourcesState, RecommendedResourcesAction> = (
  state = initState, action,
) => {
  switch (action.type) {
    case RecommendedResourcesActionTypes.SET_RECOMMENDED_RESOURCES:
      return action.payload
    case RecommendedResourcesActionTypes.REMOVE_FROM_RECOMMENDED_RESOURCES:
      const { resourceId, skillId } = action.payload
      const recommendations = state[skillId] || []

      return {
        ...state,
        [skillId]: recommendations.filter(({ id }) => id !== resourceId)
      }
    default:
      return state
  }
}
