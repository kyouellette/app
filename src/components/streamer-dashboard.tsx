import styled from 'styled-components/native';
import { useState } from 'react';

import { Colors } from '../style/colors';
import { sbThirty, rEighteen, sbTwelve } from '../style/fonts';
import BackHeader from './back-header';
import { useAuth } from '../contexts/auth-context';
import { useNavigation } from '@react-navigation/native';

const StreamerDashboard = () => {
  const { unLinkTwitch } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = () => {
    try {
      unLinkTwitch();
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <ScreenContainer>
        <BackHeader />
      <ContentContainer>
        <MainContainer>
      <HeaderContainer>
        <SubHeader>Streamer Dashboard</SubHeader>
      </HeaderContainer>
      </MainContainer>
      <SubmitButton onPress={handleSubmit}>
        <SubmitText>Unlink Twitch</SubmitText>
      </SubmitButton>
      </ContentContainer>
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
  justify-content: space-between;
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
  padding-bottom: 48px;
`

const MainContainer = styled.View`

`;

const HeaderContainer = styled.View`
  align-items: center;
`;

const SubHeader = styled.Text`
  ${sbThirty};
  padding-top: 32px;
  color: ${Colors.greenOne};
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: ${Colors.redOne};
  padding: 14px;
  margin-top: 32px;
  align-items: center;
  border-radius: 8px;
`;

const SubmitText = styled.Text`
  ${sbTwelve};
  color: ${Colors.white};
`;

export default StreamerDashboard;