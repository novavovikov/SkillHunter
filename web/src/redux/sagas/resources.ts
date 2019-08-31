import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ENotifications } from '../../constants/notification'
import { EResourceTypes } from '../../types'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { ResourcesActionTypes } from '../actionTypes/resources'
import {
  AddResourceSaga,
  ChangeResourceLikeStatusSaga,
  GetResourcesSaga,
  RemoveResourceSaga,
  UpdateResourceSaga,
} from '../interfaces/resources'
import { errorHandler } from '../utils/errorHandler'

function * getResourcesRecommendationsSaga (skillIds: number[]) {
  try {
    const { data: recommendedResources } = yield call(
      ajax.get, `${API.USER_SKILL_RECOMMENDATION_RESOURCES}?skillIds=${skillIds}`,
    )

    yield put(ac.setRecommendedResources(recommendedResources))
  } catch (error) {
    yield put(errorHandler('getResourcesRecommendationsSaga: ', error))
  }
}

function * getResourcesSaga ({ skillsetId, skillIds }: GetResourcesSaga) {
  yield put(ac.addLoading('resources'))

  try {
    const { data: resources } = yield call(ajax.get, `${API.USER_RESOURCE}/${skillsetId}?skillIds=${skillIds}`)

    yield put(ac.setResources(resources))
    yield getResourcesRecommendationsSaga(skillIds)
  } catch (error) {
    yield put(errorHandler('getResourcesSaga: ', error))
  }

  yield put(ac.removeLoading('resources'))
}

function * addResourceSaga ({ payload }: AddResourceSaga) {
  yield put(ac.addLoading('addResource'))

  try {
    const { data } = payload
    const type = data.type || EResourceTypes.Article

    const { data: resource } = yield call(ajax.post, `${API.RESOURCE}/${type}`, data)

    if (!resource) {
      throw new Error('Resource in not defined')
    }

    const { data: userResource } = yield call(ajax.post, API.USER_RESOURCE, {
      resourceId: resource.id,
      ...payload,
    })

    yield put(ac.addResource(userResource))

    yield put(ac.removeFromRecommendedResources({
      resourceId: resource.id,
      skillId: payload.skillId
    }))

    yield put(ac.addNotification({
      message: 'Material was added',
      type: ENotifications.success,
    }))
  } catch (error) {
    yield put(errorHandler('addResourceSaga: ', error))
  }

  yield put(ac.removeLoading('addResource'))
}

function * updateResourceSaga ({ payload }: UpdateResourceSaga) {
  try {
    const { id, ...otherProps } = payload
    const { data } = yield call(ajax.put, `${API.USER_RESOURCE}/${id}`, otherProps)

    yield put(ac.updateResource(data))
  } catch (error) {
    yield put(errorHandler('updateResourceSaga: ', error))
  }
}

function * changeResourceLikeStatusSaga ({ payload }: ChangeResourceLikeStatusSaga) {
  try {
    const { data } = yield call(
      payload.isLiked ? ajax.post : ajax.delete,
      `${API.RESOURCE}/${payload.resourceId}/like`,
    )

    yield put(ac.changeResourceLikeStatus(data))
  } catch (error) {
    yield put(errorHandler('changeResourceLikeStatusSaga: ', error))
  }
}

function * removeResourcesSaga ({ payload: { userSkill, id } }: RemoveResourceSaga) {
  try {
    yield call(ajax.delete, `${API.USER_RESOURCE}/${id}`)

    yield put(ac.removeResource({ userSkill, id }))

    yield put(ac.addNotification({
      message: 'Material was removed',
      type: ENotifications.success,
    }))
  } catch (error) {
    yield put(errorHandler('removeResourcesSaga: ', error))
  }
}

export function * watchResources () {
  yield takeEvery(ResourcesActionTypes.SAGA_GET_RESOURCES, getResourcesSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_ADD_RESOURCE, addResourceSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_UPDATE_RESOURCE, updateResourceSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_CHANGE_RESOURCE_LIKE_STATUS, changeResourceLikeStatusSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_REMOVE_RESOURCE, removeResourcesSaga)
}
