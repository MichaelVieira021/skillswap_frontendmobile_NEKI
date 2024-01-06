import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../screens/Login';

export const Routes = () => {
  return (
    <NavigationContainer>
      <Login/>
    </NavigationContainer>
  );
}