import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import View from 'react-native-ui-lib/view';
import colors from '@utils/Colors';
import { barStyle } from '@utils/Constants';

interface Wrapper {
  isLight?: boolean;
  children: ReactNode;
}

export const ContainerWrapper = ({ isLight = true, children }: Wrapper) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isLight ? barStyle.darkContent : barStyle.lightContent}
        backgroundColor={isLight ? colors.white : colors.black}
      />
      {children}
    </SafeAreaView>
  );
};

const Wrapper = ({ children }: Wrapper) => {
  return (
    <View flex paddingH-30>
      {children}
    </View>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
