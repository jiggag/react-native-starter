import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Detail } from 'screens/Detail';
import { Main } from 'screens/Main';

const queryClient = new QueryClient();

if (__DEV__) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });

    return true;
  }).catch((err) => {
    console.error(err);
  });
}

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
