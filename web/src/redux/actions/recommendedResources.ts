import { RecommendedResourcesActionTypes } from '../actionTypes/recommendedResources'
import {
  RemoveFromRecommendedResources,
  RemoveFromRecommendedResourcesPayload,
  SetRecommendedResources,
} from '../interfaces/recommendedResources'
import { RecommendedResourcesState } from '../reducers/recommendedResources'

export const setRecommendedResources = (data: RecommendedResourcesState): SetRecommendedResources => ({
  type: RecommendedResourcesActionTypes.SET_RECOMMENDED_RESOURCES,
  payload: data,
})

export const removeFromRecommendedResources = (
  data: RemoveFromRecommendedResourcesPayload,
): RemoveFromRecommendedResources => ({
  type: RecommendedResourcesActionTypes.REMOVE_FROM_RECOMMENDED_RESOURCES,
  payload: data,
})
