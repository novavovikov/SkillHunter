import React, { FC } from 'react'
import { ReduxStore } from './redux'
import Login from './containers/Login'

const App: FC = () => (
  <ReduxStore>
    <Login/>
  </ReduxStore>
)

export default App
