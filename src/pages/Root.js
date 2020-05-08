import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import Colors from '../../utils/Colors';

const Root = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text>starter</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Root;
