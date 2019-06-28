import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotificationProvider } from './providers/Notification'
import ReduxStore from './redux/store'
import { Routes } from './routing'

const App: React.FC = () => {
  return (
    <ReduxStore>
      <NotificationProvider>
        <Router>
          <Routes/>
        </Router>
      </NotificationProvider>
    </ReduxStore>
  )
}

export default App
