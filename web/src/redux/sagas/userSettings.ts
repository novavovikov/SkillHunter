import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import { UserSettingsActionTypes } from '../actionTypes/userSettings'
import ac from '../actions'
import { errorHandler } from '../utils/errorHandler'
import { UpdateUserSettingsSaga } from '../interfaces/userSettings'

function * getUserSettingsSaga () {
  try {
    const { data } = yield call(ajax.get, API.USER_SETTINGS)

    yield put(ac.setUserSettings(data))
  } catch (error) {
    yield put(errorHandler('getUserSettingsSaga: ', error))
  }
}

function * updateUserSettingsSaga ({ payload }: UpdateUserSettingsSaga) {
  try {
    yield call(ajax.put, API.USER_SETTINGS, payload)

    yield put(ac.updateUserSettings(payload))
  } catch (error) {
    yield put(errorHandler('updateUserSettingsSaga: ', error))
  }
}

export function * watchUserSettings () {
  yield takeEvery(UserSettingsActionTypes.SAGA_GET_USER_SETTINGS, getUserSettingsSaga)
  yield takeEvery(UserSettingsActionTypes.SAGA_UPDATE_USER_SETTINGS, updateUserSettingsSaga)
}
