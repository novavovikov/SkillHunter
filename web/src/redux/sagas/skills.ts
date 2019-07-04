import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { SkillType } from '../../types'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { SkillsActionTypes } from '../actionTypes/skills'
import { AddSkillsSaga, GetSkillsDataPayload, RemoveSkillsSaga } from '../interfaces/skills'

export function * getSkillsDataSaga ({ skillsetId }: GetSkillsDataPayload) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax, `${API.USER_SKILL}/${skillsetId}`)

    const skillIds = yield data.map(({ id }: SkillType) => id)
    yield put(ac.getResourcesSaga(skillsetId, skillIds ))

    yield put(ac.setSkillsData(data))
  } catch (error) {
    yield put(ac.setUserData([]))
    console.warn('getSkillsDataSaga: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * addSkillsSaga ({ skillsetId, skills }: AddSkillsSaga) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax.post, `${API.USER_SKILL}/${skillsetId}`, { skills })

    yield put(ac.addSkillToData(data))
  } catch (error) {
    console.warn('addSkillsSaga: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * removeSkillsSaga ({ skillIds }: RemoveSkillsSaga) {
  try {
    yield call(ajax.delete, `${API.USER_SKILL}?ids=${skillIds}`)

    yield put(ac.removeSkills(skillIds))
  } catch (error) {
    console.warn('removeSkillsSaga: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * watchGetSkillsData () {
  yield takeEvery(SkillsActionTypes.SAGA_GET_SKILLS, getSkillsDataSaga)
  yield takeEvery(SkillsActionTypes.SAGA_ADD_SKILLS, addSkillsSaga)
  yield takeEvery(SkillsActionTypes.SAGA_REMOVE_SKILLS, removeSkillsSaga)
}
