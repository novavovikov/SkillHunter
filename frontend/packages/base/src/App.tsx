import * as React from 'react'
import { ReduxStore } from './redux'
import { routes } from './routes'

const core = require('@react-navigation/core')
const web = require('@react-navigation/web')

const Navigation = core.createSwitchNavigator(routes)
const App = web.createBrowserApp(Navigation)

export default () => (
  <ReduxStore>
    <App />
  </ReduxStore>
)
