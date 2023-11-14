import React, { useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, LogBox } from 'react-native';
import { Colors } from './src/style/colors';
import { Router } from './src/navigation/stack-navigator'; // Import your StackNavigator
// import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/auth-context';

type CustomStatusBarType = {
  backgroundColor: string,
}

const CustomStatusBar = ({
  backgroundColor,
}: CustomStatusBarType) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ height: insets.top, backgroundColor: backgroundColor || 'white'}}>
      <StatusBar animated={true} barStyle={'light-content'} />
    </View>
  )
}

export default function App() {
  LogBox.ignoreAllLogs();
  // May use later, load custom font
  // const [fontsLoaded] = useFonts({
  //   'Semi-Bold': require('./assets/fonts/Semi-Bold.ttf'),
  // });
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <AuthProvider>
    <SafeAreaProvider style={{backgroundColor: Colors.blackOne}}>
      <CustomStatusBar backgroundColor={Colors.blackOne}/>
      <Router />
    </SafeAreaProvider>
    </AuthProvider>
  );
}
