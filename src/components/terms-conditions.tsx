import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../style/colors';
import { mSixteen, sbTwentyFour } from '../style/fonts';
import BackHeader from './back-header';

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.blackOne};
  padding: 20px;
`;

const Title = styled.Text`
  color: ${Colors.white};
  ${sbTwentyFour};
  font-weight: bold;
  margin-bottom: 20px;
`;

const Text = styled.Text`
  color: ${Colors.white};
  ${mSixteen};
  margin-bottom: 15px;
`;

const Link = styled.Text`
  color: ${Colors.greenOne};
`;

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${Colors.blackOne};
`;

const TermsAndConditions = () => {
  return (
    <ScreenContainer>
    <BackHeader />
    <Container>
      <Title>Terms and Conditions</Title>
      <Text>
        Welcome to StreamBet!
        </Text>
        <Text>
        By accessing and using this app, you agree to be bound
        by the following terms and conditions:
      </Text>
      <Text>
        1. You must be at least 18 years old to use this app.
      </Text>
      <Text>
        2. Only one account is allowed per user.
      </Text>
      <Text>
        For the full terms and conditions, please read our{' '}
        <Link>Terms of Service</Link>.
      </Text>
    </Container>
    </ScreenContainer>
  );
};

export default TermsAndConditions;
