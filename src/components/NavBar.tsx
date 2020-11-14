import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';

interface NavBar {
  onPressLeft?: () => void;
  onPressRight?: () => void;
  text?: string;
}

const NavBar = ({ onPressRight, text, onPressLeft }: NavBar) => {
  return (
    <View row marginB-20 style={styles.nav}>
      <View flex>
        {!!onPressLeft && (
          <View flex center>
            <TouchableWithoutFeedback onPress={onPressLeft}>
              <Text>왼쪽</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      <View flex-3 center>
        {!!text && <Text>{text}</Text>}
      </View>
      <View flex>
        {!!onPressRight && (
          <View flex center>
            <TouchableWithoutFeedback onPress={onPressRight}>
              <Text>오른쪽</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  nav: {
    borderWidth: 1,
    height: 50,
  },
});
