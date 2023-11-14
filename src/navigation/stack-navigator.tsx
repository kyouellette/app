import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/auth-context';
import AppStack from './app-stack';
import AuthStack from './auth-stack';
import { ActivityIndicator } from 'react-native'; // Make sure to import ActivityIndicator and Colors from 'react-native'
import { Colors } from '../style/colors';
import styled from 'styled-components/native';

export const Router = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingScreenBackground>
        <ActivityIndicator size="large" color={Colors.greenOne} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
      </LoadingScreenBackground>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const LoadingScreenBackground = styled.View`
  flex: 1;
  background-color: ${Colors.blackOne};
`;
