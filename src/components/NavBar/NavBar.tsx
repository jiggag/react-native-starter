import React from 'react';
import { StyleSheet } from 'react-native';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';
import { NavBack } from 'components/NavBar/NavBack';
import { NavClose } from 'components/NavBar/NavClose';

const IS_CLOSE = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const;

interface NavBarProps {
  onPressLeft?: () => void;
  onPressRight?: () => void;
  text?: string;
  isClose?: 'LEFT' | 'RIGHT';
}

export const NavBar = ({
  onPressRight, text, onPressLeft, isClose = IS_CLOSE.RIGHT,
}: NavBarProps) => {
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

const styles = StyleSheet.create({
  nav: {
    height: 50,
  },
});
