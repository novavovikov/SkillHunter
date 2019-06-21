import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { SkillType } from '../../types'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { SkillsActionTypes } from '../actionTypes/skills'
import { AddSkillsByProfessionId, GetSkillsDataPayload } from '../interfaces/skills'

export function * getSkillsDataSaga ({ payload }: GetSkillsDataPayload) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax, `${API.SKILLS}/${payload}`)

    const skillIds = yield data.map(({ id }: SkillType) => id)
    yield put(ac.getResourcesSaga({ professionId: payload, skillIds }))

    yield put(ac.setSkillsData(data))
  } catch (error) {
    yield put(ac.setUserData([]))
    console.warn('getSkillsDataSaga: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * addSkillsByProfessionIdSaga ({ payload }: AddSkillsByProfessionId) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax.post, `${API.SKILLS}/${payload.professionId}`, {
      skills: payload.skills,
    })

    yield put(ac.addSkillToData(data))
  } catch (error) {
    console.warn('addSkillsByProfessionIdSaga: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * watchGetSkillsData () {
  yield takeEvery(SkillsActionTypes.SAGA_GET_SKILLS, getSkillsDataSaga)
  yield takeEvery(SkillsActionTypes.SAGA_ADD_SKILLS, addSkillsByProfessionIdSaga)
}
