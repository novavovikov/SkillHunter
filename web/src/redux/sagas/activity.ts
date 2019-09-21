import { call, put, select, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import { ActivityActionTypes } from '../actionTypes/activity'
import { GetSkillActivitySaga, GetSkillsetActivitySaga } from '../interfaces/activity'
import { errorHandler } from '../utils/errorHandler'
import { setSkillActivity, setSkillsetActivity } from '../actions/activity'

function * getSkillsetActivity ({ payload }: GetSkillsetActivitySaga) {
  try {
    const { data } = yield call(ajax.get, `${API.SKILLSET_ACTIVITY}/${payload}`)

    yield (put(setSkillsetActivity(data)))
  } catch (error) {
    yield put(errorHandler('getSkillsetActivity: ', error))
  }
}

function * getSkillActivity ({ payload }: GetSkillActivitySaga) {
  try {
    const { data } = yield call(ajax.get, `${API.SKILL_ACTIVITY}/${payload}`)

    yield (put(setSkillActivity({
      skillId: payload,
      data,
    })))
  } catch (error) {
    yield put(errorHandler('getSkillActivity: ', error))
  }
}

export function * watchActivity () {
  yield takeEvery(ActivityActionTypes.SAGA_GET_SKILLSET_ACTIVITY, getSkillsetActivity)
  yield takeEvery(ActivityActionTypes.SAGA_GET_SKILL_ACTIVITY, getSkillActivity)
}
