import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import View from 'react-native-ui-lib/view';
import { Colors } from '@utils/Colors';
import { barStyle } from '@utils/Constants';

interface WrapperProps {
  isLight?: boolean;
  children: ReactNode;
}

export const ContainerWrapper = ({ isLight = true, children }: WrapperProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isLight ? barStyle.darkContent : barStyle.lightContent}
        backgroundColor={isLight ? Colors.white : Colors.black}
      />
      {children}
    </SafeAreaView>
  );
};

export const Wrapper = ({ isLight, children }: WrapperProps) => {
  return (
    <View flex paddingH-30>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
