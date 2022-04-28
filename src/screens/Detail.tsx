import React, { useCallback } from 'react';
import {
  Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme,
} from 'react-native';
import notifee, { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';

export function Detail() {
  const isDarkMode = useColorScheme() === 'dark';

  const onPress = useCallback(() => {
    console.log('onPress');
  }, []);

  const onDisplayNotification = useCallback(async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.displayNotification({
      title: '알림',
      body: '내용',
      android: {
        channelId,
      },
    });
  }, []);

  const onCreateTriggerNotification = useCallback(async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 1000 * 10,
      repeatFrequency: RepeatFrequency.HOURLY,
    };

    await notifee.createTriggerNotification(
      {
        title: '알림',
        body: '10초 후',
        android: {
          channelId,
        },
      },
      trigger,
    );
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.sectionTitle}>Starter (Detail)</Text>
        <Button title="Go back" onPress={onPress} />
        <Button title="Display Notification" onPress={onDisplayNotification} />
        <Button title="Trigger Notification" onPress={onCreateTriggerNotification} />
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
