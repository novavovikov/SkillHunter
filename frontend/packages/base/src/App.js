import React from 'react'
import NativeTachyons from 'react-native-style-tachyons'
import { StyleSheet, Text, View } from 'react-native'

NativeTachyons.build({
  rem: 16,
  fontRem: 20,
  clsPropName: 'cls'
}, StyleSheet)

const App = () => (
  <View cls="flx_i flx_row jcc aic ma3 bb max_h3 mh0">
    <Text cls="f4">
      Skillhunter
    </Text>
  </View>
)

export default NativeTachyons.wrap(App)
