import React from 'react';
import View from 'react-native-ui-lib/view';
import { NavBack } from 'components/NavBar/NavBack';
import { NavClose } from 'components/NavBar/NavClose';

type ButtonType = 'close' | 'back';

export interface NavBarButtonProps {
  type: ButtonType;
  onPress: () => void;
}

export const NavBarButton = ({ type, onPress }: NavBarButtonProps) => {
  const Button = type === 'close' ? NavClose : NavBack;
  return (
    <View flex center>
      <Button onPress={onPress} />
    </View>
  );
};
