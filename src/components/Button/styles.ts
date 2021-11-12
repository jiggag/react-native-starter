import { TextStyle, ViewStyle } from 'react-native';
import { Colors } from '@utils/Colors';
import { FontFamily, FontSize, FontWeight } from '@utils/Fonts';

export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonType = 'info' | 'primary' | 'danger' | 'warn';

export const ButtonHeight = {
  large: 52,
  medium: 48,
  small: 40,
} as const;

const ButtonBgColor: Record<ButtonType, typeof Colors[keyof typeof Colors]> = {
  info: Colors.white,
  danger: Colors.red,
  warn: Colors.orange,
  primary: Colors.blue,
};

const ButtonTextColor: Record<ButtonType, typeof Colors[keyof typeof Colors]> = {
  info: Colors.black,
  danger: Colors.white,
  warn: Colors.white,
  primary: Colors.white,
};

const ButtonStyle: Record<ButtonSize, Record<'height' | 'fontSize' | 'lineHeight', number>> = {
  large: {
    height: ButtonHeight.large,
    fontSize: FontSize.large,
    lineHeight: 21,
  },
  medium: {
    height: ButtonHeight.medium,
    fontSize: FontSize.medium,
    lineHeight: 21,
  },
  small: {
    height: ButtonHeight.small,
    fontSize: FontSize.small,
    lineHeight: 21,
  },
};

const buildStyle = (
  type: ButtonType,
  size: ButtonSize,
): {
  button: ViewStyle;
  text: TextStyle;
} => {
  return {
    button: {
      backgroundColor: ButtonBgColor[type],
      height: ButtonStyle[size].height,
      borderRadius: 6,
      justifyContent: 'center',
    },
    text: {
      color: ButtonTextColor[type],
      fontFamily: FontFamily.medium,
      fontSize: ButtonStyle[size].fontSize,
      fontWeight: FontWeight.normal,
      letterSpacing: 0,
      lineHeight: ButtonStyle[size].lineHeight,
      textAlign: 'center',
    },
  };
};

const buildButton = (
  type: ButtonType,
): Record<
  ButtonSize,
  {
    button: ViewStyle;
    text: TextStyle;
  }
> => {
  return {
    large: buildStyle(type, 'large'),
    medium: buildStyle(type, 'medium'),
    small: buildStyle(type, 'small'),
  };
};

export const buttonStyles: Record<
  ButtonType,
  Record<
    ButtonSize,
    {
      button: ViewStyle;
      text: TextStyle;
    }
  >
> = {
  info: buildButton('info'),
  primary: buildButton('primary'),
  danger: buildButton('danger'),
  warn: buildButton('warn'),
};
