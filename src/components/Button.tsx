import React from 'react';
import { TouchableOpacity, Text } from 'react-native-ui-lib';
import { ViewStyle, StyleProp } from 'react-native';

interface ButtonProps {
  onPress: () => {};
  text: string;
  style: StyleProp<ViewStyle>;
}

const Button = ({ onPress, text, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} {...rest}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;