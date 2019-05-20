import { all } from 'redux-saga/effects'
import { watchGetTickets } from './tickets'
import { watchGetCurrency } from './currency'

export default function * rootSaga () {
  yield all([
    watchGetCurrency(),
    watchGetTickets()
  ])
}
