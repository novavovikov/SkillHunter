import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Analytics, Notifications, ProgressBar } from './components'
import ReduxStore from './redux/store'
import { Routes } from './routing'
import { initAnalytics } from './utils/analytics'

class App extends Component {
  componentDidMount (): void {
    initAnalytics()
  }

  render () {
    return (
      <ReduxStore>
        <Router>
          <Routes/>
          <Analytics/>
        </Router>
        <Notifications/>
        <ProgressBar/>
      </ReduxStore>
    )
  }
}

export default App
