import { Action } from 'redux'
import { TicketsActionTypes } from '../actionTypes/tickets'
import { TicketInterface } from '../../interfaces/ticket'
import { currency } from '../../constants/currency'

export interface Filter {
  type: string
  data: any[]
}

export interface GetTickets extends Action {
  type: TicketsActionTypes.SAGA_GET_TICKETS
}

export interface SetTickets extends Action {
  type: TicketsActionTypes.SET_TICKETS,
  payload: TicketInterface[]
}

export interface SetTicketsCurrency extends Action {
  type: TicketsActionTypes.SET_TICKETS_CURRENCY,
  payload: currency
}

export interface SetTicketsFilter extends Action {
  type: TicketsActionTypes.SET_TICKETS_FILTER,
  payload: Filter
}

export interface SetTicketsLoading extends Action {
  type: TicketsActionTypes.SET_TICKETS_LOADING
  payload: boolean
}

export interface SetTicketsError extends Action {
  type: TicketsActionTypes.SET_TICKETS_ERROR,
  payload: string
}

export type TicketsAction =
  GetTickets |
  SetTickets |
  SetTicketsError |
  SetTicketsLoading |
  SetTicketsCurrency |
  SetTicketsFilter
