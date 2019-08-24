import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import { SkillsetActionTypes } from '../actionTypes/skillset'
import { AddSkillsetSaga } from '../interfaces/skillset'
import { errorHandler } from '../utils/errorHandler'

function * addSkillset ({ skillsets }: AddSkillsetSaga) {
  try {
    yield call(ajax.post, API.SKILLSET, { skillsets })
  } catch (error) {
    yield put(errorHandler('addSkillset: ', error))
  }
}

export function * watchSkillsetData () {
  yield takeEvery(SkillsetActionTypes.SAGA_ADD_SKILLSET, addSkillset)
}
