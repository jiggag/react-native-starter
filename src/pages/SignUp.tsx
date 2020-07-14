import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Button from '@components/Button';
import Colors from '../../utils/Colors';
import { signUpAction } from '../actions/auth';

const Root = () => {
  const dispatch = useDispatch();

  const onPress = () => dispatch(signUpAction.REQUEST());

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button paddingV-30 style={{ backgroundColor: '#ec2' }} onPress={onPress} text="SignUp" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Root;
