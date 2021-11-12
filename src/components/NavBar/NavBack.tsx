import React from 'react';
import { Image, Pressable } from 'react-native';
import View from 'react-native-ui-lib/view';
import { images } from 'utils/Images';

export interface NavBackProps {
  onPress: () => void;
}

export const NavBack = ({ onPress }: NavBackProps) => {
  return (
    <Pressable onPress={onPress}>
      <View padding-8>
        <Image source={images.arrowLeft} />
      </View>
    </Pressable>
  );
};
