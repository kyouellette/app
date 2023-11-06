import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/auth-context';
import { createStackNavigator } from '@react-navigation/stack';
import AppStack from './app-stack';
import AuthStack from './auth-stack';

export const Router = () => {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
