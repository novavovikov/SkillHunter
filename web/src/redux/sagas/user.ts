import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { UserActionTypes } from '../actionTypes/user'

export function * getUserData () {
  yield put(ac.setUserLoadingStatus(true))

  try {
    const { data } = yield call(ajax, API.ME)

    yield put(ac.setUserData(data))
  } catch (error) {
    yield put(ac.setUserData(null))
  }

  yield put(ac.setUserLoadingStatus(false))
}

export function * watchGetUserData () {
  yield takeEvery(UserActionTypes.SAGA_GET_USER, getUserData)
}
