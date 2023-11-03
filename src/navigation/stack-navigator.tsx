import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/auth-context';
import { createStackNavigator } from '@react-navigation/stack';
import AppStack from './app-stack';
import AuthStack from './auth-stack';

export const Router = () => {
  const { authData, loading } = useAuth();
  console.log(authData);
  // if (loading) {
  //   return <Loading />
  // }
  return (
    <NavigationContainer>
      {authData?.token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
