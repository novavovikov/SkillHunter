import { combineReducers } from 'redux'
import { tickets, TicketsState } from './tickets'
import { currency, CurrencyState } from './currency'

interface RootState {
  tickets: TicketsState
  currency: CurrencyState
}

export default () => {
  return combineReducers<RootState>({
    tickets,
    currency
  })
}
