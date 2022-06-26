import React, { useCallback } from 'react';
import { Text, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, Button } from 'react-native';

export function Main() {
  const isDarkMode = useColorScheme() === 'dark';

  const onPress = useCallback(() => {
    console.log('onPress');
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.sectionTitle}>Starter (Main)</Text>
        <Button title="Go Detail" onPress={onPress} />
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
