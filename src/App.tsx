import React, { useCallback, useEffect } from 'react';
import notifee, { EventType, AuthorizationStatus } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeStackParams, StackScreen } from 'constants/navigation';
import { Detail } from 'screens/Detail';
import { Main } from 'screens/Main';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<NativeStackParams>();

export function App() {
  const checkApplicationPermission = useCallback(async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }, []);

  useEffect(() => {
    checkApplicationPermission();

    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
        default:
          break;
      }
    });
  }, [checkApplicationPermission]);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={StackScreen.Main} component={Main} />
          <Stack.Screen name={StackScreen.Detail} component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
