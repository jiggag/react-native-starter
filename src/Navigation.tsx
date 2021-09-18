import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ReducerProps } from 'reducers';
import Root from './pages/Root';
import SignUp from './pages/SignUp';
import Splash from './pages/Splash';

const Stack = createStackNavigator();

export const Navigation = () => {
  const {
    auth: { token },
    root: { isAppSplash },
  } = useSelector((state: ReducerProps) => state);

  return (
    <SafeAreaProvider>
      {isAppSplash ? (
        <Splash />
      ) : (
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {token ? <Stack.Screen name="Root" component={Root} /> : <Stack.Screen name="SignUp" component={SignUp} />}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
};
