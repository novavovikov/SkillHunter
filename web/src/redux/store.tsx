import React, { FC } from 'react'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import getCombinedReducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store: Store = createStore(
  getCombinedReducers(),
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
)

sagaMiddleware.run(sagas)

const ReduxStore: FC = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
)

export default ReduxStore
