import { RecommendedResourcesActionTypes } from '../actionTypes/recommendedResources'

export interface RemoveFromRecommendedResourcesPayload {
  skillId: number
  resourceId: number
}

export interface SetRecommendedResources {
  type: RecommendedResourcesActionTypes.SET_RECOMMENDED_RESOURCES
  payload: any
}

export interface RemoveFromRecommendedResources {
  type: RecommendedResourcesActionTypes.REMOVE_FROM_RECOMMENDED_RESOURCES
  payload: RemoveFromRecommendedResourcesPayload
}

export type RecommendedResourcesAction =
  SetRecommendedResources |
  RemoveFromRecommendedResources
