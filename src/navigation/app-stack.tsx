import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../components/main-screen';

const Stack = createStackNavigator();

export type AppStackParamList = {
  Main: undefined
};

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{
          headerShown: false, // Hide the header for all screens in this navigator
        }}>
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    );
  }

  export default AppStack;