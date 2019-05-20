import { Reducer } from 'redux'
import { TicketsActionTypes } from '../actionTypes/tickets'
import { TicketsAction } from '../interfaces/tickets'
import { TicketInterface } from '../../interfaces/ticket'
import { currency } from '../../constants/currency'

export interface TicketsState {
  hasError: string | null
  isLoading: boolean
  data: TicketInterface[]
  currency: currency
  filters: object
}

const initState = {
  hasError: null,
  isLoading: true,
  data: [],
  currency: currency.RUB,
  filters: {
    stops: [0, 1, 2]
  }
}

export const tickets: Reducer<TicketsState, TicketsAction> = (state = initState, action) => {
  switch (action.type) {
    case TicketsActionTypes.SET_TICKETS: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case TicketsActionTypes.SET_TICKETS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      }
    }
    case TicketsActionTypes.SET_TICKETS_CURRENCY: {
      return {
        ...state,
        currency: action.payload,
      }
    }
    case TicketsActionTypes.SET_TICKETS_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.type]: action.payload.data
        },
      }
    }
    case TicketsActionTypes.SET_TICKETS_ERROR: {
      return {
        ...state,
        hasError: action.payload,
      }
    }
    default: return state
  }
}
