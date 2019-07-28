import { all } from 'redux-saga/effects'
import { watchUserData } from './user'
import { watchGetSkillsData } from './skills'
import { watchResources } from './resources'
import { watchUserSkill } from './userSkill'

export default function * rootSaga () {
  yield all([
    watchUserData(),
    watchGetSkillsData(),
    watchResources(),
    watchUserSkill(),
  ])
}
