import React, { useMemo } from 'react';
import {
  ViewStyle, StyleSheet, TouchableWithoutFeedback, TextStyle,
} from 'react-native';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';
import { Colors } from '@utils/Colors';
import { FontFamily, FontSize, FontWeight } from '@utils/Fonts';

interface ButtonProps {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  onPress, text, disabled = false, btnStyle = {}, textStyle = {},
}: ButtonProps) => {
  const customBtnStyle = useMemo(() => [styles.button, btnStyle], [btnStyle]);
  const customTextStyle = useMemo(() => [styles.text, textStyle], [textStyle]);

  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View style={customBtnStyle}>
        <Text style={customTextStyle}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    paddingBottom: 17,
    paddingTop: 18,
  },
  text: {
    color: Colors.white,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.medium,
    fontWeight: FontWeight.normal,
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
  },
});
