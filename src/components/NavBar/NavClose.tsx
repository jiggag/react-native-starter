import React from 'react';
import { Pressable, Image } from 'react-native';
import View from 'react-native-ui-lib/view';
import { images } from 'utils/Images';

export interface NavCloseProps {
  onPress: () => void;
}

export const NavClose = ({ onPress }: NavCloseProps) => {
  return (
    <Pressable onPress={onPress}>
      <View padding-6>
        <Image source={images.close} />
      </View>
    </Pressable>
  );
};
