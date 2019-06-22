import { ResourceType } from '../../types'
import { ResourcesActionTypes } from '../actionTypes/resources'

export interface GetResourcesRequestPayload {
  professionId: number
  skillIds: number[]
}

export interface ResourceSagaPayload {
  professionId: number
  skillId: number
  resourceId: number
}

export interface ResourceLikeStatusSagaPayload {
  resourceId: number
  isLiked: boolean
}

export interface ResourceLikeStatusPayload {
  id: number
  isLiked: boolean
  likes: number
}

export interface ResourcePayload {
  skillId: number
  resourceId: number
}

export interface GetResourcesSaga {
  type: ResourcesActionTypes.SAGA_GET_RESOURCES,
  payload: GetResourcesRequestPayload
}

export interface AddResourceSaga {
  type: ResourcesActionTypes.SAGA_ADD_RESOURCE,
  payload: ResourceSagaPayload
}

export interface UpdateResourceSaga {
  type: ResourcesActionTypes.SAGA_UPDATE_RESOURCE,
  payload: Partial<ResourceType>
}

export interface ChangeResourceLikeStatusSaga {
  type: ResourcesActionTypes.SAGA_CHANGE_RESOURCE_LIKE_STATUS,
  payload: ResourceLikeStatusSagaPayload
}

export interface RemoveResourceSaga {
  type: ResourcesActionTypes.SAGA_REMOVE_RESOURCE,
  payload: ResourceSagaPayload
}

export interface SetResources {
  type: ResourcesActionTypes.SET_RESOURCES,
  payload: any
}

export interface AddResource {
  type: ResourcesActionTypes.ADD_RESOURCE,
  payload: ResourceType
}

export interface UpdateResource {
  type: ResourcesActionTypes.UPDATE_RESOURCE,
  payload: ResourceType
}

export interface ChangeResourceLikeStatus {
  type: ResourcesActionTypes.CHANGE_RESOURCE_LIKE_STATUS,
  payload: ResourceLikeStatusPayload
}

export interface RemoveResource {
  type: ResourcesActionTypes.REMOVE_RESOURCE,
  payload: ResourcePayload
}

export type ResourcesAction =
  GetResourcesSaga |
  AddResourceSaga |
  UpdateResourceSaga |
  RemoveResourceSaga |
  SetResources |
  AddResource |
  UpdateResource |
  ChangeResourceLikeStatus |
  RemoveResource
