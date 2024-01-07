import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginContextProvider } from '../contexts/LoginContext';
import { StackNavigator } from './StackNavigator';

export const Routes = () => {
  return (
    <NavigationContainer>
      <LoginContextProvider>
        <StackNavigator/>
      </LoginContextProvider>
    </NavigationContainer>
  );
}