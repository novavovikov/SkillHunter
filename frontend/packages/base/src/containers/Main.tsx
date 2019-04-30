import React, { FunctionComponent } from 'react'
import { Text, View } from 'react-native'
// @ts-ignore
import { styles as s } from 'react-native-style-tachyons'

const Main: FunctionComponent = () => {
  return (
    <View style={[s.ba, s.jcfs, s.pa2]}>
      <Text>Skillhunter</Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat natus illo ipsum. Enim
        ipsam vel ratione qui aliquid veritatis perspiciatis nisi, deserunt voluptatibus minus neque
        necessitatibus, minima rem cum sint.
      </Text>
    </View>
  )
}

export default Main
