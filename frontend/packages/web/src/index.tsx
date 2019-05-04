import { ComponentType } from 'react'
import { AppRegistry } from 'react-native'

// @ts-ignore
import App from 'base/src/App'
// @ts-ignore
import { runAppConfiguration } from 'base/src/config/AppConfig'

runAppConfiguration()

const render = (AppComponent: ComponentType) => {
  AppRegistry.registerComponent('frontend', () => AppComponent)

  AppRegistry.runApplication('frontend', {
    rootTag: document.getElementById('root')
  })
}

render(App)
