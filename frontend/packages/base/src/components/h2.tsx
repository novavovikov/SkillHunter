import React, { FC } from 'react'
import { Text } from 'react-native'

const s = require('react-native-style-tachyons').styles

const H2: FC = ({ children }) => {
  return (
    <Text style={[
      s.f5,
      s.fw6,
      s.mb2,
      s.gray
    ]}>
      {children}
    </Text>
  )
}

export default H2
