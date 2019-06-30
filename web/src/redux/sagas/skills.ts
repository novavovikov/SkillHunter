import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { SkillType } from '../../types'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { SkillsActionTypes } from '../actionTypes/skills'
import { AddSkillsBySkillsetId, GetSkillsDataPayload } from '../interfaces/skills'

export function * getSkillsDataSaga ({ payload }: GetSkillsDataPayload) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax, `${API.USER_SKILLS}/${payload}`)

    const skillIds = yield data.map(({ id }: SkillType) => id)
    yield put(ac.getResourcesSaga({ skillsetId: payload, skillIds }))

    yield put(ac.setSkillsData(data))
  } catch (error) {
    yield put(ac.setUserData([]))
    console.warn('getSkillsDataSaga: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * addSkillsBySkillsetIdSaga ({ payload }: AddSkillsBySkillsetId) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax.post, `${API.USER_SKILLS}/${payload.skillsetId}`, {
      skills: payload.skills,
    })

    yield put(ac.addSkillToData(data))
  } catch (error) {
    console.warn('addSkillsBySkillsetIdSaga: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * watchGetSkillsData () {
  yield takeEvery(SkillsActionTypes.SAGA_GET_SKILLS, getSkillsDataSaga)
  yield takeEvery(SkillsActionTypes.SAGA_ADD_SKILLS, addSkillsBySkillsetIdSaga)
}
