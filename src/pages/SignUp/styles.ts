import { StyleSheet } from 'react-native';
import { Colors } from '@utils/Colors';
import { FontFamily, FontSize } from '@utils/Fonts';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    paddingVertical: 30,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  text: {
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.large,
  },
});
