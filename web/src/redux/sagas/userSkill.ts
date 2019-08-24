import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ENotifications } from '../../constants/notification'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { UserSkillActionTypes } from '../actionTypes/userSkill'
import { AddResourceToUserSkillSaga, GetUserSkillSaga } from '../interfaces/userSkill'
import { errorHandler } from '../utils/errorHandler'

function * getUserSkillSaga ({ skillId }: GetUserSkillSaga) {
  yield put(ac.addLoading('userSkill'))

  try {
    const { data } = yield call(ajax, `${API.USER_SKILL}/${skillId}/resources`)

    yield put(ac.setUserSkill(data))
  } catch (error) {
    yield put(errorHandler('getUserSkillSaga: ', error))
  }

  yield put(ac.removeLoading('userSkill'))
}

function * addResourceToUserSkillSaga ({ payload }: AddResourceToUserSkillSaga) {
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

    yield put(ac.addResourceToUserSkill(userResource))
    yield put(ac.addNotification({
      message: 'Material was added',
      type: ENotifications.success,
    }))
  } catch (error) {
    yield put(errorHandler('addResourceSaga: ', error))
  }
}

export function * watchUserSkill () {
  yield takeEvery(UserSkillActionTypes.SAGA_GET_USER_SKILL, getUserSkillSaga)
  yield takeEvery(UserSkillActionTypes.SAGA_ADD_RESOURCE_TO_USER_SKILL, addResourceToUserSkillSaga)
}
