import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReduxStore from './redux/store'
import { Routes } from './routing'

const App: React.FC = () => {
  return (
    <ReduxStore>
      <Router>
        <Routes/>
      </Router>
    </ReduxStore>
  )
}

export default App
