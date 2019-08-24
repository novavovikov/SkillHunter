import { all } from 'redux-saga/effects'
import { watchUserData } from './user'
import { watchSkillsetData } from './skillset'
import { watchSkillsData } from './skills'
import { watchResources } from './resources'
import { watchUserSkill } from './userSkill'

export default function * rootSaga () {
  yield all([
    watchUserData(),
    watchSkillsetData(),
    watchSkillsData(),
    watchResources(),
    watchUserSkill(),
  ])
}
