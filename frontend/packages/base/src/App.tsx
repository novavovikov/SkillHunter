import React, { FunctionComponent } from 'react'
import { ReduxStore } from './redux'
import Main from './containers/Main'

const App: FunctionComponent = () => (
  <ReduxStore>
    <Main />
  </ReduxStore>
)

export default App
