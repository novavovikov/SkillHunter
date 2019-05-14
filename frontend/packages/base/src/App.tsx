import React from 'react'
import { routes } from './config/routes'
import { ReduxStore } from './redux'

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
