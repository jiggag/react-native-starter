import React, { useCallback } from 'react';
import {
  Text, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Detail() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.sectionTitle}>Starter (Detail)</Text>
        <Button title="Go back" onPress={onPress} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});
