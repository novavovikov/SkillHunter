import React from 'react'
import { ReduxStore } from './redux'
import { routes } from './config/routes'

const nav = require('@react-navigation/core')
const webNav = require('@react-navigation/web')

const Navigation = nav.createSwitchNavigator(routes, {
  navigationOptions: {
    title: 'SkillHunter'
  }
})
const App = webNav.createBrowserApp(Navigation)

export default () => {
  return (
    <ReduxStore>
      <App />
    </ReduxStore>
  )
}
