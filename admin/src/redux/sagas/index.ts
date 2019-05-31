import { all } from 'redux-saga/effects'
import { watchGetUserData } from './user'

export default function * rootSaga () {
  yield all([
    watchGetUserData(),
  ])
}
