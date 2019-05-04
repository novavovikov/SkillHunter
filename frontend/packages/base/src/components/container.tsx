import React, { FC } from 'react'
import { View } from 'react-native'

interface Props {
  children: any
}

const Login: FC<Props> = ({ children }) => {
  return (
    <View
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingRight: 20,
        paddingLeft: 20,
        width: '100%',
        maxWidth: 1180
      }}
    >
      {children}
    </View>
  )
}

export default Login
