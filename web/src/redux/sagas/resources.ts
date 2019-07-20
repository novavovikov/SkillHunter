import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { NotificationTypes } from '../../constants/notification'
import { ajax } from '../../utils/ajax'
import { logger } from '../../utils/logger'
import ac from '../actions'
import { ResourcesActionTypes } from '../actionTypes/resources'
import {
  AddResourceSaga,
  ChangeResourceLikeStatusSaga,
  GetResourcesSaga,
  RemoveResourceSaga,
  UpdateResourceSaga,
} from '../interfaces/resources'

export function * getResourcesSaga ({ skillsetId, skillIds }: GetResourcesSaga) {
  yield put(ac.addLoading('resources'))

  try {
    const { data } = yield call(ajax, `${API.USER_RESOURCE}/${skillsetId}?skillIds=${skillIds}`)

    yield put(ac.setResources(data))
  } catch (error) {
    logger('getResourcesSaga: ', error)
  }

  yield put(ac.removeLoading('resources'))
}

export function * addResourceSaga ({ payload }: AddResourceSaga) {
  try {
    const { data } = payload

    const { data: resource } = yield call(ajax.post, `${API.RESOURCE}/${data.type}`, data)

    if (!resource) {
      throw new Error('Resource in not defined')
    }

    const { data: userResource } = yield call(ajax.post, API.USER_RESOURCE, {
      resourceId: resource.id,
      ...payload,
    })

    yield put(ac.addResource(userResource))
    yield put(ac.addNotification({
      message: 'Material was added',
      type: NotificationTypes.success,
    }))
  } catch (error) {
    logger('addResourceSaga: ', error)

    yield put(ac.addNotification({
      message: 'Material error',
      type: NotificationTypes.error,
    }))
  }
}

export function * updateResourceSaga ({ payload }: UpdateResourceSaga) {
  try {
    const { id, ...otherProps } = payload
    const { data } = yield call(ajax.put, `${API.USER_RESOURCE}/${id}`, otherProps)

    yield put(ac.updateResource(data))
  } catch (error) {
    logger('updateResourceSaga: ', error)
  }
}

export function * changeResourceLikeStatusSaga ({ payload }: ChangeResourceLikeStatusSaga) {
  try {
    const { data } = yield call(
      payload.isLiked ? ajax.post : ajax.delete,
      `${API.RESOURCE}/${payload.resourceId}/like`,
    )

    yield put(ac.changeResourceLikeStatus(data))
  } catch (error) {
    logger('changeResourceLikeStatusSaga: ', error)
  }
}

export function * removeResourcesSaga ({ payload: { userSkill, id } }: RemoveResourceSaga) {
  try {
    yield call(ajax.delete, `${API.USER_RESOURCE}/${id}`)

    yield put(ac.removeResource({ userSkill, id }))

    yield put(ac.addNotification({
      message: 'Material was removed',
      type: NotificationTypes.success,
    }))
  } catch (error) {
    logger('removeResourcesSaga: ', error)
  }
}

export function * watchResources () {
  yield takeEvery(ResourcesActionTypes.SAGA_GET_RESOURCES, getResourcesSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_ADD_RESOURCE, addResourceSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_UPDATE_RESOURCE, updateResourceSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_CHANGE_RESOURCE_LIKE_STATUS, changeResourceLikeStatusSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_REMOVE_RESOURCE, removeResourcesSaga)
}
