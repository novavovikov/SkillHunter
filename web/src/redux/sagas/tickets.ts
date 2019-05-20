import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { TicketsActionTypes } from '../actionTypes/tickets'
import { TICKETS_URL } from '../constants/api'
import ac from '../actions'

export function * getTickets () {
  yield put(ac.setTicketsLoading(true))

  try {
    const { data } = yield call(axios, TICKETS_URL)
    yield put(ac.setTickets(data.tickets))
  } catch (error) {
    console.warn('tickets', error)
    yield put(ac.setTicketsError('Что-то пошло не так. Проверьте подключение к серверу.'))
  }

  yield put(ac.setTicketsLoading(false))
}

export function * watchGetTickets () {
  yield takeEvery(TicketsActionTypes.SAGA_GET_TICKETS, getTickets)
}
