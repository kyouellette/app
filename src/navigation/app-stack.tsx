import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/home';

const Stack = createStackNavigator();

export type AppStackParamList = {
  Home: undefined
};

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{
          headerShown: false, // Hide the header for all screens in this navigator
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
  }

  export default AppStack;