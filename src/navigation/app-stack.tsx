import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/screens/home';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{
          headerShown: false, // Hide the header for all screens in this navigator
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  export default AppStack;