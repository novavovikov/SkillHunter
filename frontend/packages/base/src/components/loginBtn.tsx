import React, { FC, ReactNode } from 'react'
import { Image, Linking, StyleSheet, Text } from 'react-native'
import colors from '../theme/colors'
import { System } from '../enum/system'

const s = StyleSheet.create({
  btn: {
    display: 'flex',
    color: colors.blue,
    backgroundColor: colors.whiteLilac,
    width: 157,
    height: 43,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    cursor: 'pointer',
  },
})

interface Props {
  children: ReactNode
  system: System
}

const LoginButton: FC<Props> = ({ children, system, ...rest }) => {
  const goToSystem = () => {
    Linking.openURL(`/api/auth/${system}`).
      catch((err) => console.error('An error occurred', err))
  }

  return (
    <Text
      style={s.btn}
      onPress={goToSystem}
      {...rest}
    >
      <Image
        source={{ uri: `/static/${system}-icon.svg` }}
        style={{
          width: 16,
          height: 16,
          marginRight: 6,
        }}
      />
      {children}
    </Text>
  )
}

export default LoginButton
