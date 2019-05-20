import { CurrencyActionTypes } from '../actionTypes/currence'
import { GetCurrency, SetCurrency } from '../interfaces/currency'
import { CurrencyState } from '../reducers/currency'

export const getCurrency = (): GetCurrency => ({
  type: CurrencyActionTypes.SAGA_GET_CURRENCY,
})

export const setCurrency = (data: CurrencyState): SetCurrency => ({
  type: CurrencyActionTypes.SET_CURRENCY,
  payload: data,
})
