import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '../../constants/api'
import { ajax } from '../../utils/ajax'
import ac from '../actions'
import { SkillsActionTypes } from '../actionTypes/skills'
import { AddSkillsByProfessionId, GetSkillsData } from '../interfaces/skills'

export function * getSkillsData ({ payload }: GetSkillsData) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax, `${API.SKILLS}/${payload}`)

    yield put(ac.setSkillsData(data))
  } catch (error) {
    yield put(ac.setUserData([]))
    console.warn('getSkillsData: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * addSkillsByProfessionId ({ payload }: AddSkillsByProfessionId) {
  yield put(ac.setSkillsLoadingStatus(true))

  try {
    const { data } = yield call(ajax.post, `${API.SKILLS}/${payload.professionId}`, {
      skills: payload.skills,
    })

    yield put(ac.addSkillToData(data))
  } catch (error) {
    console.warn('addSkillsByProfessionId: ', error)
  }

  yield put(ac.setSkillsLoadingStatus(false))
}

export function * watchGetSkillsData () {
  yield takeEvery(SkillsActionTypes.SAGA_GET_SKILLS, getSkillsData)
  yield takeEvery(SkillsActionTypes.SAGA_ADD_SKILLS, addSkillsByProfessionId)
}
