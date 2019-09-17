import { all } from 'redux-saga/effects'
import { watchUserData } from './user'
import { watchUserSettings } from './userSettings'
import { watchSkillsetData } from './skillset'
import { watchSkillsData } from './skills'
import { watchResources } from './resources'
import { watchUserSkill } from './userSkill'

export default function * rootSaga () {
  yield all([
    watchUserData(),
    watchUserSettings(),
    watchSkillsetData(),
    watchSkillsData(),
    watchResources(),
    watchUserSkill(),
  ])
}
