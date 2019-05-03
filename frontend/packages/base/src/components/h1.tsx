import React, { FC } from 'react'
import { Text } from 'react-native'

const s = require('react-native-style-tachyons').styles

const H1: FC = ({ children }) => {
  return (
    <Text style={[
      s.f3,
      s.fw6,
      s.mb4,
      s.gray,
    ]}>
      {children}
    </Text>
  )
}

export default H1
