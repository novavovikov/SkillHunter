import { fork } from 'redux-saga/effects'
import initialization from './initialization'

export default function* root() {
  const sagas = [fork(initialization)]

  yield sagas
}
