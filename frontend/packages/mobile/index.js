import { AppRegistry } from 'react-native'
import App from 'base/src/App'
import { runAppConfiguration } from 'base/src/AppConfig'
import { name as appName } from './app.json'

runAppConfiguration()

AppRegistry.registerComponent(appName, () => App)
