import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';
import View from 'react-native-ui-lib/view';
import { images } from 'utils/Images';

export interface NavBackProps {
  onPress: () => void;
}

export const NavBack = ({ onPress }: NavBackProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View padding-8>
        <Image source={images.arrowLeft} />
      </View>
    </TouchableWithoutFeedback>
  );
};
