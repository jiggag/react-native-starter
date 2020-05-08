import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Colors from '../../utils/Colors';
import Button from '../components/Button';
import { signUpAction } from '../actions/auth';

const Root = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPress = () => dispatch(signUpAction.REQUEST());

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
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
