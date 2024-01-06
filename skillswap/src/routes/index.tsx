import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '../screens/Login';
import { Cadastro } from '../screens/Cadastro';

export const Routes = () => {
  return (
    <NavigationContainer>
      <Login/>
      {/* <Cadastro/> */}
    </NavigationContainer>
  );
}