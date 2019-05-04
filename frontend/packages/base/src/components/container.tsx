import React, { FC } from 'react'
import { View } from 'react-native'

const Login: FC = ({ children }) => {
  return (
    <View style={{
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingRight: 20,
      paddingLeft: 20,
      width: '100%',
      maxWidth: 1180,
    }}>
      {children}
    </View>
  )
}

export default Login
