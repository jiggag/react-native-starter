import { StyleSheet } from 'react-native';
import colors from '@utils/Colors';
import { fontFamily, fontSize } from '@utils/Fonts';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderWidth: 2,
    paddingVertical: 30,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  text: {
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.large,
  },
});

export default styles;
