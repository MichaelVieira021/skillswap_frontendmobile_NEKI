import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../screens/Login';
import { Cadastro } from '../screens/Cadastro';
import { LoginContextProvider } from '../contexts/LoginContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StackNavigator } from './StackNavigator';
import { SkillsUser } from '../screens/SkillsUser';

export const Routes = () => {
  return (
    // <SafeAreaProvider>
    <NavigationContainer>
      <LoginContextProvider>
        {/* <Login/> */}
        {/* <Cadastro/> */}
        {/* <SkillsUser/> */}
        <StackNavigator/>
      </LoginContextProvider>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
}