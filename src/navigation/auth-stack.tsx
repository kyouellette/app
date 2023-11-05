import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login';
import Signup from '../components/signup';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator();

const AuthStack = () => {
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