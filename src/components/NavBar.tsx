import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';
import images from '@utils/Images';

interface Button {
  onPress: () => void;
}

const NavBack = ({ onPress }: Button) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View padding-8>
        <Image source={images.arrowLeft} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const NavClose = ({ onPress }: Button) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View padding-6>
        <Image source={images.close} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const IS_CLOSE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

interface NavBar {
  onPressLeft?: () => void;
  onPressRight?: () => void;
  text?: string;
  isClose?: 'LEFT' | 'RIGHT';
}

const NavBar = ({
  onPressRight, text, onPressLeft, isClose = IS_CLOSE.RIGHT,
}: NavBar) => {
  return (
    <View row marginB-20 style={styles.nav}>
      <View flex>
        {!!onPressLeft && (
          <View flex center>
            {isClose === IS_CLOSE.LEFT ? <NavClose onPress={onPressLeft} /> : <NavBack onPress={onPressLeft} />}
          </View>
        )}
      </View>
      <View flex-3 center>
        {!!text && <Text>{text}</Text>}
      </View>
      <View flex>
        {!!onPressRight && (
          <View flex center>
            <NavClose onPress={onPressRight} />
          </View>
        )}
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  nav: {
    height: 50,
  },
});
