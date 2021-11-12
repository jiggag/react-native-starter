import React from 'react';
import { StyleSheet } from 'react-native';
import Text from 'react-native-ui-lib/text';
import View from 'react-native-ui-lib/view';
import { NavBarButton, NavBarButtonProps } from 'components/NavBar/NavBarButton';

interface NavBarProps {
  leftButton?: NavBarButtonProps;
  rightButton?: NavBarButtonProps;
  text?: string;
}

export const NavBar = ({ leftButton, rightButton, text }: NavBarProps) => {
  return (
    <View row marginB-20 style={styles.nav}>
      <View flex>{!!leftButton && <NavBarButton type={leftButton.type} onPress={leftButton.onPress} />}</View>
      <View flex-3 center>
        <Text>{text}</Text>
      </View>
      <View flex>{!!rightButton && <NavBarButton type={rightButton.type} onPress={rightButton.onPress} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    height: 50,
  },
});
