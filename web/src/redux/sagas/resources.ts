import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { ResourcesActionTypes } from '../actionTypes/resources'
import { GetResourcesSaga, RemoveResourceSaga } from '../interfaces/resources'

export function * getResourcesSaga ({ payload }: GetResourcesSaga) {
  try {
    const { data } = yield call(ajax.post, `${API.USER_RESOURCES}/${payload.professionId}`, payload.skillIds)

    yield put(ac.setResources(data))
  } catch (error) {
    yield put(ac.setUserData([]))
    console.warn('getResourcesSaga: ', error)
  }
}

export function * addResourceSaga ({ payload }: RemoveResourceSaga) {
  try {
    const { data } = yield call(ajax.post, API.USER_RESOURCE, payload)

    yield put(ac.addResource(data))
  } catch (error) {
    yield put(ac.setUserData([]))
    console.warn('getResourcesSaga: ', error)
  }
}

export function * removeResourcesSaga ({ payload: { professionId, skillId, resourceId } }: RemoveResourceSaga) {
  try {
    yield call(ajax.delete, `${API.USER_RESOURCE}/${professionId}/${skillId}/${resourceId}`)

    yield put(ac.removeResource({ skillId, resourceId }))
  } catch (error) {
    yield put(ac.setUserData([]))
    console.warn('getResourcesSaga: ', error)
  }
}

export function * watchResources () {
  yield takeEvery(ResourcesActionTypes.SAGA_GET_RESOURCES, getResourcesSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_ADD_RESOURCE, addResourceSaga)
  yield takeEvery(ResourcesActionTypes.SAGA_REMOVE_RESOURCE, removeResourcesSaga)
}
