import * as React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import ReduxStore from './redux/store'
import { routes } from './routing'
import './styles/global.css'

const App: React.FC = () => {
  return (
    <ReduxStore>
      <Router>
        {renderRoutes(routes)}
      </Router>
    </ReduxStore>
  )
}

export default App
