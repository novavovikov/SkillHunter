import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { SkillsActionTypes } from '../actionTypes/skills'
import { AddSkillsSaga, GetSkillsDataPayload, RemoveSkillsSaga } from '../interfaces/skills'
import { errorHandler } from '../utils/errorHandler'

function * getSkillsDataSaga ({ skillsetId }: GetSkillsDataPayload) {
  yield put(ac.addLoading('skill'))

  try {
    const { data } = yield call(ajax.get, `${API.USER_SKILL}/${skillsetId}/list`)

    yield put(ac.setSkillsData(data))
  } catch (error) {
    yield put(ac.setSkillsData([]))
    yield put(errorHandler('getSkillsDataSaga: ', error))
  }

  yield put(ac.removeLoading('skill'))
}

function * addSkillsSaga ({ skillsetId, skills }: AddSkillsSaga) {
  yield put(ac.addLoading('addSkill'))

  try {
    const { data } = yield call(ajax.post, `${API.USER_SKILL}/${skillsetId}`, { skills })

    yield put(ac.addSkillToData(data))
  } catch (error) {
    yield put(errorHandler('addSkillsSaga: ', error))
  }

  yield put(ac.removeLoading('addSkill'))
}

function * removeSkillsSaga ({ skillIds }: RemoveSkillsSaga) {
  yield put(ac.addLoading('removeSkill'))

  try {
    yield call(ajax.delete, `${API.USER_SKILL}?ids=${skillIds}`)

    yield put(ac.removeSkills(skillIds))
  } catch (error) {
    yield put(errorHandler('removeSkillsSaga: ', error))
  }

  yield put(ac.removeLoading('removeSkill'))
}

export function * watchSkillsData () {
  yield takeEvery(SkillsActionTypes.SAGA_GET_SKILLS, getSkillsDataSaga)
  yield takeEvery(SkillsActionTypes.SAGA_ADD_SKILLS, addSkillsSaga)
  yield takeEvery(SkillsActionTypes.SAGA_REMOVE_SKILLS, removeSkillsSaga)
}
