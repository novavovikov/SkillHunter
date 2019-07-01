import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { UserActionTypes } from '../actionTypes/user'
import { RemoveUserSkillsetSaga } from '../interfaces/user'

export function * getUserDataSaga () {
  yield put(ac.setUserLoadingStatus(true))

  try {
    const { data } = yield call(ajax, API.ME)

    yield put(ac.setUserData(data))
  } catch (error) {
    yield put(ac.setUserData(null))
  }

  yield put(ac.setUserLoadingStatus(false))
}

export function * removeUserSkillset ({ skillsetId }: RemoveUserSkillsetSaga) {
  try {
    yield call(ajax.delete, `${API.SKILLSET}/${skillsetId}`)

    yield put(ac.removeUserSkillset(skillsetId))
  } catch (error) {
  }
}

export function * watchUserData () {
  yield takeEvery(UserActionTypes.SAGA_GET_USER, getUserDataSaga)
  yield takeEvery(UserActionTypes.SAGA_REMOVE_USER_SKILLSET, removeUserSkillset)
}
