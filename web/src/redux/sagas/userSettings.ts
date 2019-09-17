import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import { UserSettingsActionTypes } from '../actionTypes/userSettings'
import ac from '../actions'
import { errorHandler } from '../utils/errorHandler'

function * getUserSettingsSaga () {
  try {
    const { data } = yield call(ajax.get, API.USER_SETTINGS)

    yield put(ac.setUserSettings(data))
  } catch (error) {

    yield put(errorHandler('getUserSettingsSaga: ', error))
  }
}

export function * watchUserSettings () {
  yield takeEvery(UserSettingsActionTypes.SAGA_GET_USER_SETTINGS, getUserSettingsSaga)
}
