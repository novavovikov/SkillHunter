import React, { Component } from 'react'
import TagManager from 'react-gtm-module'
import { BrowserRouter as Router } from 'react-router-dom'
import { Notifications, ProgressBar } from './components'
import ReduxStore from './redux/store'
import { Routes } from './routing'

class App extends Component {
  componentDidMount (): void {
    TagManager.initialize({
      gtmId: 'GTM-K4FPF86',
    })
  }

  render () {
    return (
      <ReduxStore>
        <Router>
          <Routes/>
        </Router>
        <Notifications/>
        <ProgressBar/>
      </ReduxStore>
    )
  }
}

export default App
