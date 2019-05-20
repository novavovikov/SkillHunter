import { Reducer } from 'redux'
import { CurrencyActionTypes } from '../actionTypes/currence'
import { CurrencyAction } from '../interfaces/currency'

export interface CurrencyState {
  RUB: number
  USD: number
  EUR: number
}

const initState = {
  RUB: 1,
  USD: 65.2287,
  EUR: 73.0888
}

export const currency: Reducer<CurrencyState, CurrencyAction> = (state = initState, action) => {
  if (action.type === CurrencyActionTypes.SET_CURRENCY) {
    return {
      ...state,
      ...action.payload
    }
  }

  return state
}
