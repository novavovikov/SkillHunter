import { all } from 'redux-saga/effects'
import { watchUserData } from './user'
import { watchGetSkillsData } from './skills'
import { watchResources } from './resources'

export default function * rootSaga () {
  yield all([
    watchUserData(),
    watchGetSkillsData(),
    watchResources(),
  ])
}
