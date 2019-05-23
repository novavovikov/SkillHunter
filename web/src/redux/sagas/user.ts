import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { UserActionTypes } from '../actionTypes/user'

export function * getUser () {
  try {
    const { data } = yield call(ajax, API.ME)
    yield put(ac.setUser({
      isLoading: false,
      isAuthenticated: true,
      data
    }))
  } catch (error) {
    yield put(ac.setUser({
      isLoading: false,
      isAuthenticated: false,
      data: {}
    }))
  }
}

export function * watchGetUser () {
  yield takeEvery(UserActionTypes.SAGA_GET_USER, getUser)
}
