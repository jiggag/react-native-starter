import React, { ReactNode } from 'react';
import View from 'react-native-ui-lib/view';

interface Wrapper {
  children: ReactNode;
}

const Wrapper = ({ children }: Wrapper) => {
  return (
    <View flex paddingH-30>
      {children}
    </View>
  );
};

export default Wrapper;
