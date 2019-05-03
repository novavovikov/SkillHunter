import { StyleSheet } from 'react-native'
import colors from './theme/colors'

const NativeTachyons = require('react-native-style-tachyons')

export const runAppConfiguration = () => {
  NativeTachyons.build(
    {
      rem: 16,
      fontRem: 20,
      clsPropName: 'cls',
      colors: {
        palette: colors
      }
    },
    StyleSheet
  )
}
