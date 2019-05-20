import { createSelector, createStructuredSelector } from 'reselect'
import { CurrencyState } from '../redux/reducers/currency'
import { TicketsState } from '../redux/reducers/tickets'

export interface State {
  currency: CurrencyState
  tickets: TicketsState
}

export const ticketsSelector = createStructuredSelector({
  tickets: (state: State) => state.tickets,
})

export const filteredTicketsSelector = createSelector(
  (state: State) => state.tickets,
  (state: State) => state.currency,
  (tickets, currency) => {

    return tickets.data.
      filter(ticket => {
        for (const key in tickets.filters) {
          const filterValues = tickets.filters[key]

          if (!filterValues.includes(ticket[key])) {
            return false
          }
        }

        return true
      }).
      map(ticket => ({
        ...ticket,
        price: ticket.price / currency[tickets.currency],
        currency: tickets.currency,
      }))
  },
)
