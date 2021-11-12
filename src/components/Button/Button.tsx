import React from 'react';
import { Pressable } from 'react-native';
import Text from 'react-native-ui-lib/text';
import { ButtonSize, ButtonType, buttonStyles } from '@components/Button/styles';

interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  onPress: () => void;
  disabled?: boolean;
  text: string;
}

export const Button = ({
  type = 'primary', onPress, disabled, size = 'medium', text,
}: ButtonProps) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={buttonStyles[type][size].button}>
      <Text style={buttonStyles[type][size].text}>{text}</Text>
    </Pressable>
  );
};
