import { StyleSheet } from 'react-native';
// @ts-ignore
import NativeTachyons from 'react-native-style-tachyons';
import colors from './theme/colors';
export const runAppConfiguration = () => {
    NativeTachyons.build({
        rem: 16,
        fontRem: 20,
        clsPropName: 'cls',
        colors: {
            palette: colors
        }
    }, StyleSheet);
};
//# sourceMappingURL=AppConfig.js.map