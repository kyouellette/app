import React, { useState } from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import BackHeader from './back-header';
import { useNavigation } from '@react-navigation/native';

const TwitchAuthWebView = ({setShowWebView, setErrorState, setAccessCode}: {setShowWebView: React.Dispatch<React.SetStateAction<boolean>>, setErrorState: React.Dispatch<React.SetStateAction<boolean | null>>, setAccessCode: React.Dispatch<React.SetStateAction<string>>}) => {
  const twitchAuthURL = 'https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=uazprb0v9zr5p11om9mo3tc99h6r6h&redirect_uri=http://localhost:3100&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671';
  const navigation = useNavigation();

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;
    console.log('URL:', url);
  
    const urlParts = url.split('?');
    if (urlParts.length > 1) {
      const queryParams = urlParts[1].split('&');
      const queryParamObject: { [key: string]: string } = {};
  
      queryParams.forEach((param) => {
        const paramParts = param.split('=');
        if (paramParts.length === 2) {
          queryParamObject[paramParts[0]] = decodeURIComponent(paramParts[1]);
        }
      });
  
      if ('error' in queryParamObject) {
        const error = queryParamObject['error'];
        const errorDescription = queryParamObject['error_description'];
        setErrorState(true)
      }
      if ('code' in queryParamObject) {
        setAccessCode(queryParamObject['code']);
        console.log('Authorization Code:', queryParamObject['code']);
        setErrorState(false);
      }
      if (url.startsWith('http://localhost:3100')) {
        setShowWebView(false);
      }
    }
  };
  
  
  

  return (
    <View style={styles.container}>
        <BackHeader />
      <WebView
        incognito={true}
        source={{ uri: twitchAuthURL }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TwitchAuthWebView;
