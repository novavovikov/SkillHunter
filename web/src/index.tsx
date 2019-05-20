import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './app'

const rootEl = document.getElementById('app')

ReactDOM.render(
  <App/>,
  rootEl,
)

// Hot Module Replacement
declare let module: { hot: any }

if (module.hot) {
  module.hot.accept('./app', () => {
    const HotApp = require('./app').default

    ReactDOM.render(
      <HotApp/>,
      rootEl,
    )
  })
}
