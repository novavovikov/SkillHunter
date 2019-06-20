import { all } from 'redux-saga/effects'
import { watchGetUserData } from './user'
import { watchGetSkillsData } from './skills'

export default function * rootSaga () {
  yield all([
    watchGetUserData(),
    watchGetSkillsData(),
  ])
}
