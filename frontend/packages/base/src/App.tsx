import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
// @ts-ignore
import { styles as s } from 'react-native-style-tachyons'

const App: FunctionComponent = () => {
  return (
    <View style={[s.ba, s.jcfs, s.pa2]}>
      <Text>Skillhunter</Text>
    </View>
  )
}

export default App
