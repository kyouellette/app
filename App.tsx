import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View, StatusBar, LogBox, Animated, Easing } from 'react-native';
import { Colors } from './src/style/colors';
import { Router } from './src/navigation/stack-navigator'; // Import your StackNavigator
import LottieSplash from './assets/animated-splash.json';
import LottieView from 'lottie-react-native';
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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setAppReady] = useState<boolean>(false);
  const [isLayoutReady, setLayoutReady] = useState<boolean>(false);
  const animationProgress = useRef(new Animated.Value(0));
  LogBox.ignoreAllLogs();

  useEffect(() => {
       const animation = Animated.timing(animationProgress.current, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        })
        animation.start(() => {
          setAppReady(true);
        });
}, []);

const onApplicationReady = () => {
  setAppReady(true);
};

const onLayout = useCallback(async () => {
  try {
      await SplashScreen.hideAsync();
  } catch (e) {
  } finally {
      setLayoutReady(true);
  }
}, []);

const showAnimation = !(isAppReady && isLayoutReady);

  return (
    <AuthProvider>
    <SafeAreaProvider style={{backgroundColor: Colors.blackOne}}>
    {isAppReady && (
      <>
      <CustomStatusBar backgroundColor={Colors.blackOne}/>
      <Router />
      </>
        )}
          {showAnimation && (
          <View
            pointerEvents="none"
            style={{flex: 1}}
            onLayout={onLayout}>
              <LottieView
                source={LottieSplash}
                loop={false}
                progress={animationProgress.current}/>
          </View>
            )}
    </SafeAreaProvider>
    </AuthProvider>
  );
}
