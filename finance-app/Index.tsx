import React from 'react'
import { Provider } from 'react-redux'
import 'react-native-get-random-values'
import { registerRootComponent } from 'expo'
import { store } from './src/redux/store'
import App from './src/App'

import 'react-native-get-random-values'

export default function Index() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

registerRootComponent(Index)
