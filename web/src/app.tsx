import React, { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Notifications } from './components'
import ReduxStore from './redux/store'
import { Routes } from './routing'

const App: FC = () => {
  return (
    <ReduxStore>
      <Router>
        <Routes/>
      </Router>
      <Notifications/>
    </ReduxStore>
  )
}

export default App
