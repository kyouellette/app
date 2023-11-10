import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../components/main-screen';
import AddTwitch from '../components/add-twitch';
import StreamerDashboard from '../components/streamer-dashboard';

const Stack = createStackNavigator();

export type AppStackParamList = {
  Main: undefined
  AddTwitch: undefined
  EditProfile: undefined
  Terms: undefined
  Loading: undefined
  HowToUse: undefined
  StreamerDashboard: undefined
};

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{
          headerShown: false, // Hide the header for all screens in this navigator
        }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="AddTwitch" component={AddTwitch} />
          <Stack.Screen name="StreamerDashboard" component={StreamerDashboard} />
        </Stack.Navigator>
    );
  }

  export default AppStack;