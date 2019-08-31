import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ENotifications } from '../../constants/notification'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { UserActionTypes } from '../actionTypes/user'
import { AddUserSkillsetSaga, CopyUserSkillsetSaga, RemoveUserSkillsetSaga } from '../interfaces/user'
import { errorHandler } from '../utils/errorHandler'

function * getUserDataSaga () {
  yield put(ac.addLoading('user'))

  try {
    const { data } = yield call(ajax.get, API.ME)

    yield put(ac.setUserData(data))
  } catch (error) {
    yield put(ac.setUserData(null))
  }

  yield put(ac.removeLoading('user'))
}

function * addUserSkillset ({ skillset, skills, callback }: AddUserSkillsetSaga) {
  yield put(ac.addLoading('userSkillset'))

  try {
    const { data: skillsets } = yield call(ajax.post, API.USER_SKILLSET, { skillset, skills })

    yield put(ac.updateUserData({ skillsets }))

    if (callback) {
      yield callback()
    }
  } catch (error) {
    yield put(errorHandler('addUserSkillset: ', error))
  }

  yield put(ac.removeLoading('userSkillset'))
}

function * copyUserSkillset ({ source, target }: CopyUserSkillsetSaga) {
  try {
    const { data: skillsets } = yield call(ajax.post, API.USER_SKILLSET_COPY, { source, target })

    yield put(ac.updateUserData({ skillsets }))
    yield put(ac.addNotification({
      message: 'Skillset was copied',
      type: ENotifications.success,
    }))
  } catch (error) {
    yield put(errorHandler('copyUserSkillset: ', error))
  }
}

function * removeUserSkillset ({ skillsetId }: RemoveUserSkillsetSaga) {
  try {
    yield call(ajax.delete, `${API.USER_SKILLSET}/${skillsetId}`)

    yield put(ac.removeUserSkillset(skillsetId))
  } catch (error) {
    yield put(errorHandler('removeUserSkillset: ', error))
  }
}

export function * watchUserData () {
  yield takeEvery(UserActionTypes.SAGA_GET_USER, getUserDataSaga)
  yield takeEvery(UserActionTypes.SAGA_ADD_USER_SKILLSET, addUserSkillset)
  yield takeEvery(UserActionTypes.SAGA_COPY_USER_SKILLSET, copyUserSkillset)
  yield takeEvery(UserActionTypes.SAGA_REMOVE_USER_SKILLSET, removeUserSkillset)
}
