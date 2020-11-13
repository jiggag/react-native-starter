import React from 'react';
import { ViewStyle, StyleProp, TouchableWithoutFeedback } from 'react-native';
import Text from 'react-native-ui-lib/text';

interface ButtonProps {
  onPress: () => void;
  text: string;
  style: StyleProp<ViewStyle>;
}

const Button = ({ onPress, text, ...rest }: ButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} {...rest}>
      <Text>{text}</Text>
    </TouchableWithoutFeedback>
  );
};

export default Button;
