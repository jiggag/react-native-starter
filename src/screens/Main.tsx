import React, { useCallback } from 'react';
import { Text, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, Button } from 'react-native';
import { NativeScreenProps, StackScreen } from 'constants/navigation';

export function Main({ navigation }: NativeScreenProps<StackScreen.Main>) {
  const isDarkMode = useColorScheme() === 'dark';

  const onPress = useCallback(() => {
    navigation.push(StackScreen.Detail);
  }, [navigation]);

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
