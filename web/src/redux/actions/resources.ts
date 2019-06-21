import { ResourceType } from '../../types'
import { ResourcesActionTypes } from '../actionTypes/resources'
import {
  AddResource,
  AddResourceSaga,
  ChangeResourceLikeStatus, ChangeResourceLikeStatusSaga,
  GetResourcesRequestPayload,
  GetResourcesSaga,
  RemoveResource,
  RemoveResourceSaga, ResourceLikeStatusPayload, ResourceLikeStatusSagaPayload,
  ResourcePayload,
  ResourceSagaPayload,
  SetResources, UpdateResource,
} from '../interfaces/resources'

export const getResourcesSaga = (data: GetResourcesRequestPayload): GetResourcesSaga => ({
  type: ResourcesActionTypes.SAGA_GET_RESOURCES,
  payload: data,
})

export const addResourceSaga = (data: ResourceSagaPayload): AddResourceSaga => ({
  type: ResourcesActionTypes.SAGA_ADD_RESOURCE,
  payload: data,
})

export const changeResourceLikeStatusSaga = (data: ResourceLikeStatusSagaPayload): ChangeResourceLikeStatusSaga => ({
  type: ResourcesActionTypes.SAGA_CHANGE_RESOURCE_LIKE_STATUS,
  payload: data,
})

export const removeResourceSaga = (data: ResourceSagaPayload): RemoveResourceSaga => ({
  type: ResourcesActionTypes.SAGA_REMOVE_RESOURCE,
  payload: data,
})

export const setResources = (data: any): SetResources => ({
  type: ResourcesActionTypes.SET_RESOURCES,
  payload: data,
})

export const addResource = (data: ResourceType): AddResource => ({
  type: ResourcesActionTypes.ADD_RESOURCE,
  payload: data,
})

export const updateResource = (data: ResourceType): UpdateResource => ({
  type: ResourcesActionTypes.UPDATE_RESOURCE,
  payload: data,
})

export const changeResourceLikeStatus = (data: ResourceLikeStatusPayload): ChangeResourceLikeStatus => ({
  type: ResourcesActionTypes.CHANGE_RESOURCE_LIKE_STATUS,
  payload: data,
})

export const removeResource = (data: ResourcePayload): RemoveResource => ({
  type: ResourcesActionTypes.REMOVE_RESOURCE,
  payload: data,
})
