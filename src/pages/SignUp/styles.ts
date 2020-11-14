import { StyleSheet } from 'react-native';
import Colors from '@utils/Colors';
import { fontFamily, fontSize } from '@utils/Fonts';

const styles = StyleSheet.create({
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
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.large,
  },
});

export default styles;
