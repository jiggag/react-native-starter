import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Root from './pages/Root';
import SignUp from './pages/SignUp';
import Splash from './pages/Splash';

interface Redux {
  auth: {
    token: string;
  };
  root: {
    isAppSplash: boolean;
  };
}

const Stack = createStackNavigator();

const Router = () => {
  const {
    auth: { token },
    root: { isAppSplash },
  } = useSelector((state: Redux) => state);

  return isAppSplash ? (
    <Splash />
  ) : (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {token ? <Stack.Screen name="Root" component={Root} /> : <Stack.Screen name="SignUp" component={SignUp} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
