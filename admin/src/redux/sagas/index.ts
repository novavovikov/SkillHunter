import { all } from 'redux-saga/effects'
import { watchUserData } from './user'

export default function * rootSaga () {
  yield all([
    watchUserData(),
  ])
}
