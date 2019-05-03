import React, { FC } from 'react'
import { applyMiddleware, compose, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import getCombinedReducers from './reducers'
import sagas from './sagas'

const logger = createLogger({
  predicate: () => __DEV__
})
const sagaMiddleware = createSagaMiddleware()
const store: Store = createStore(
  getCombinedReducers(),
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
)

sagaMiddleware.run(sagas)

export interface Props {
  children: any
}

const ReduxStore: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxStore
