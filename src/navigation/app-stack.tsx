import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../components/main-screen';
import AddTwitch from '../components/add-twitch';
import StreamerDashboard from '../components/streamer-dashboard';
import Bet from '../components/bet';
import TermsAndConditions from '../components/terms-conditions';
import HowToUse from '../components/how-to-use';

const Stack = createStackNavigator();

type StreamData = {
  id?: string;
  user_id?: string;
  user_login?: string;
  user_name?: string;
  game_id?: string;
  game_name?: string;
  type?: string;
  title?: string;
  tags?: string[];
  viewer_count?: number;
  started_at?: string;
  thumbnail_url?: string;
  tag_ids?: string[];
  is_mature?: boolean;
}

export type AppStackParamList = {
  Main: undefined
  AddTwitch: undefined
  EditProfile: undefined
  TermsAndConditions: undefined
  Loading: undefined
  HowToUse: undefined
  StreamerDashboard: undefined
  Bet: StreamData
};

const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={"Home"} screenOptions={{
          headerShown: false, // Hide the header for all screens in this navigator
        }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="AddTwitch" component={AddTwitch} />
          <Stack.Screen name="StreamerDashboard" component={StreamerDashboard} />
          <Stack.Screen name="Bet" component={Bet} />
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
          <Stack.Screen name="HowToUse" component={HowToUse} />
        </Stack.Navigator>
    );
  }

  export default AppStack;