import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../screens/Login';
import { Cadastro } from '../screens/Cadastro';
import { LoginContextProvider } from '../contexts/LoginContext';

export const Routes = () => {
  return (
    <NavigationContainer>
      <LoginContextProvider>
        <Login/>
        {/* <Cadastro/> */}
      </LoginContextProvider>
    </NavigationContainer>
  );
}