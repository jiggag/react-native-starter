import React, { useCallback, useEffect } from 'react';
import notifee, { EventType, IOSAuthorizationStatus } from '@notifee/react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Main } from 'screens/Main';

const queryClient = new QueryClient();

if (__DEV__) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import('react-query-native-devtools')
    .then(({ addPlugin }) => {
      addPlugin({ queryClient });

      return true;
    })
    .catch((err) => {
      console.error(err);
    });
}

export function App() {
  const checkApplicationPermission = useCallback(async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= IOSAuthorizationStatus.AUTHORIZED) {
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
      <Main />
    </QueryClientProvider>
  );
}
