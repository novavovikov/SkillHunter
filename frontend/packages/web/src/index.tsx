import { ComponentType } from 'react'
import { AppRegistry } from 'react-native'

import App from 'base/src/App'
import { runAppConfiguration } from 'base/src/AppConfig'

runAppConfiguration()

const render = (AppComponent: ComponentType) => {
  AppRegistry.registerComponent('frontend', () => AppComponent)

  AppRegistry.runApplication('frontend', {
    rootTag: document.getElementById('root')
  })
}

render(App)
