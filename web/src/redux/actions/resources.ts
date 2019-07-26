import { IUserResource } from '../../types'
import { ResourcesActionTypes } from '../actionTypes/resources'
import {
  AddResource,
  AddResourceSaga,
  AddResourceSagaPayload,
  ChangeResourceLikeStatus,
  ChangeResourceLikeStatusSaga,
  GetResourcesSaga,
  RemoveResource,
  RemoveResourceSaga,
  ResourceLikeStatusPayload,
  ResourceLikeStatusSagaPayload,
  SetResources,
  UpdateResource,
  UpdateResourceSaga,
} from '../interfaces/resources'

export const getResourcesSaga = (skillsetId: number, skillIds: number[]): GetResourcesSaga => ({
  type: ResourcesActionTypes.SAGA_GET_RESOURCES,
  skillsetId,
  skillIds,
})

export const addResourceSaga = (data: AddResourceSagaPayload): AddResourceSaga => ({
  type: ResourcesActionTypes.SAGA_ADD_RESOURCE,
  payload: data,
})
export const updateResourceSaga = (data: Partial<IUserResource>): UpdateResourceSaga => ({
  type: ResourcesActionTypes.SAGA_UPDATE_RESOURCE,
  payload: data,
})

export const changeResourceLikeStatusSaga = (data: ResourceLikeStatusSagaPayload): ChangeResourceLikeStatusSaga => ({
  type: ResourcesActionTypes.SAGA_CHANGE_RESOURCE_LIKE_STATUS,
  payload: data,
})

export const removeResourceSaga = (data: Partial<IUserResource>): RemoveResourceSaga => ({
  type: ResourcesActionTypes.SAGA_REMOVE_RESOURCE,
  payload: data,
})

export const setResources = (data: any): SetResources => ({
  type: ResourcesActionTypes.SET_RESOURCES,
  payload: data,
})

export const addResource = (data: IUserResource): AddResource => ({
  type: ResourcesActionTypes.ADD_RESOURCE,
  payload: data,
})

export const updateResource = (data: IUserResource): UpdateResource => ({
  type: ResourcesActionTypes.UPDATE_RESOURCE,
  payload: data,
})

export const changeResourceLikeStatus = (data: ResourceLikeStatusPayload): ChangeResourceLikeStatus => ({
  type: ResourcesActionTypes.CHANGE_RESOURCE_LIKE_STATUS,
  payload: data,
})

export const removeResource = (data: Partial<IUserResource>): RemoveResource => ({
  type: ResourcesActionTypes.REMOVE_RESOURCE,
  payload: data,
})
