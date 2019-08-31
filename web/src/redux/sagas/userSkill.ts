import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { UserSkillActionTypes } from '../actionTypes/userSkill'
import { GetUserSkillSaga } from '../interfaces/userSkill'
import { errorHandler } from '../utils/errorHandler'

function * getUserSkillSaga ({ skillId }: GetUserSkillSaga) {
  yield put(ac.addLoading('userSkill'))

  try {
    const { data } = yield call(ajax.get, `${API.USER_SKILL}/${skillId}`)

    yield put(ac.setUserSkill(data))
  } catch (error) {
    errorHandler('getUserSkillSaga: ', error)
  }

  yield put(ac.removeLoading('userSkill'))
}

export function * watchUserSkill () {
  yield takeEvery(UserSkillActionTypes.SAGA_GET_USER_SKILL, getUserSkillSaga)
}
