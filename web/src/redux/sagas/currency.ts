import axios from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'
import { CURRENCY_URL } from '../constants/api'
import { CurrencyActionTypes } from '../actionTypes/currence'
import ac from '../actions'

export function * getCurrency () {
  try {
    const { data } = yield call(axios, CURRENCY_URL)
    yield put(ac.setCurrency(data))
  } catch (error) {
    console.warn('currency', error)
  }
}

export function * watchGetCurrency () {
  yield takeEvery(CurrencyActionTypes.SAGA_GET_CURRENCY, getCurrency)
}
