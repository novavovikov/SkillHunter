import React from 'react'
import * as ReactDOM from 'react-dom'

import App from './app'
import * as serviceWorker from './serviceWorker'
import './styles/global.css'

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
