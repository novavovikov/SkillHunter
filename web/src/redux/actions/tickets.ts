import { TicketsActionTypes } from '../actionTypes/tickets'
import {
  GetTickets,
  SetTickets,
  SetTicketsCurrency,
  SetTicketsError,
  SetTicketsFilter,
  SetTicketsLoading,
  Filter
} from '../interfaces/tickets'
import { TicketInterface } from '../../interfaces/ticket'
import { currency } from '../../constants/currency'

export const getTickets = (): GetTickets => ({
  type: TicketsActionTypes.SAGA_GET_TICKETS,
})

export const setTickets = (data: TicketInterface[]): SetTickets => ({
  type: TicketsActionTypes.SET_TICKETS,
  payload: data,
})

export const setTicketsCurrency = (currency: currency): SetTicketsCurrency => ({
  type: TicketsActionTypes.SET_TICKETS_CURRENCY,
  payload: currency,
})

export const setTicketsFilter = (filter: Filter): SetTicketsFilter => ({
  type: TicketsActionTypes.SET_TICKETS_FILTER,
  payload: filter,
})

export const setTicketsLoading = (status: boolean): SetTicketsLoading => ({
  type: TicketsActionTypes.SET_TICKETS_LOADING,
  payload: status,
})

export const setTicketsError = (error: string): SetTicketsError => ({
  type: TicketsActionTypes.SET_TICKETS_ERROR,
  payload: error,
})
