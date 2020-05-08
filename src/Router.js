import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Root from './pages/Root';
import SignUp from './pages/SignUp';

const Stack = createStackNavigator();

const Router = () => {
  const { token } = useSelector(({ auth }) => auth);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {token ? (
          <Stack.Screen name="Root" component={Root} />
        ) : (
          <Stack.Screen name="SignUp" component={SignUp} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
