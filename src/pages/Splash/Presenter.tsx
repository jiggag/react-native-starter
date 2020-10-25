import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import View from 'react-native-ui-lib/view';
import { IS_DEV_MODE } from '@utils/Constants';
import styles from './styles';

const Presenter = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View flex>
        <Text>
          starter
          {IS_DEV_MODE ? 'dev' : 'prod'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Presenter;
