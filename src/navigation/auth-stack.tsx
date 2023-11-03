import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login';
import { useAuth } from '../contexts/auth-context';
import { useRoute } from '@react-navigation/native';
import Signup from '../components/signup';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator();

const AuthStack = () => {
    const { authData, loading } = useAuth();
    return (
      <Stack.Navigator initialRouteName={"Login"} screenOptions={{
        headerShown: false, // Hide the header for all screens in this navigator
      }}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    )
  }

  export default AuthStack