import { Action } from 'redux'
import { CurrencyActionTypes } from '../actionTypes/currence'
import { CurrencyState } from '../reducers/currency'

export interface GetCurrency extends Action {
  type: CurrencyActionTypes.SAGA_GET_CURRENCY
}

export interface SetCurrency extends Action {
  type: CurrencyActionTypes.SET_CURRENCY,
  payload: CurrencyState
}

export type CurrencyAction =
  GetCurrency |
  SetCurrency
