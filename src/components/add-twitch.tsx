import styled from 'styled-components/native';
import { useState } from 'react';

import { Colors } from '../style/colors';
import { sbThirty, rEighteen, rEight, sbEighteen } from '../style/fonts';
import TwitchAuthWebView from './twitch-webview';
import { useAuth } from '../contexts/auth-context';
import BackHeader from './back-header';

const AddTwitch = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [errorState, setErrorState] = useState<boolean | null>(null)
  const [accessCode, setAccessCode] = useState('');
  const handleSubmit = () => {
    setShowWebView(!showWebView);
  };

  if (errorState === null) return (
    <ScreenContainer>
        <BackHeader />
      <ContentContainer>
      <HeaderContainer>
        <SubHeader>Become a Streamer</SubHeader>
        <MainHeader>Click the button to get started</MainHeader>
      </HeaderContainer>
      <SubmitButton onPress={handleSubmit}>
        <SubmitText>Link Twitch</SubmitText>
      </SubmitButton>
      </ContentContainer>
      {showWebView && (
          <WebViewContainer>
        <TwitchAuthWebView setShowWebView={setShowWebView} setErrorState={setErrorState} setAccessCode={setAccessCode}/>
        </WebViewContainer>
      )}
    </ScreenContainer>
  );

  if (!errorState) return (
    <ScreenContainer>
        <BackHeader />
        <SuccessText>Success</SuccessText>
    </ScreenContainer>
  );

  if (errorState) return (
    <ScreenContainer>
        <BackHeader />
        <ErrorText>Error</ErrorText>
    </ScreenContainer>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${Colors.blackOne};
`;
const ContentContainer = styled.View`
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
  padding-bottom: 48px;
`

const MainHeader = styled.Text`
  ${rEighteen};
  color: ${Colors.white};
  padding-top: 16px;
`;

const HeaderContainer = styled.View`
  align-items: center;
`;

const ErrorText = styled.Text`

`;

const SuccessText = styled.Text`

`;

const SubHeader = styled.Text`
  ${sbThirty};
  padding-top: 32px;
  color: ${Colors.greenOne};
`;

const WebViewContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${Colors.greenOne};
  padding: 14px;
  margin-top: 32px;
  align-items: center;
  border-radius: 8px;
`;

const SubmitText = styled.Text`
  ${sbEighteen};
  color: ${Colors.blackOne};
`;

export default AddTwitch;