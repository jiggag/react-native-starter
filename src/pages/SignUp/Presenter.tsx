import React from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Button from '@components/Button';
import styles from './styles';

interface SignUpProps {
  onPress: () => {};
}
const Presenter = ({ onPress }: SignUpProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button paddingV-30 style={styles.button} onPress={onPress} text="SignUp" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Presenter;
