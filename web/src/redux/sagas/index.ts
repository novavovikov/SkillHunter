import { all } from 'redux-saga/effects'
import { watchUserData } from './user'
import { watchSkillsetData } from './skillset'
import { watcSkillsData } from './skills'
import { watchResources } from './resources'
import { watchUserSkill } from './userSkill'

export default function * rootSaga () {
  yield all([
    watchUserData(),
    watchSkillsetData(),
    watcSkillsData(),
    watchResources(),
    watchUserSkill(),
  ])
}
