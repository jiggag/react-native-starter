import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Colors from '../../utils/Colors';

const Root = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>starter</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Root;
