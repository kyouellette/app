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

const HowToUse = () => {
  return (
    <ScreenContainer>
      <BackHeader />
      <Container>
        <Title>How to Use StreamBet</Title>
        <Text>
          1. Select a streamer.
        </Text>
        <Text>
          2. Select the bets you want to place.
        </Text>
        <Text>
          3. Select the amount you want to bet.
        </Text>
        <Text>
          4. Place your bet and have fun!
        </Text>
      </Container>
    </ScreenContainer>
  );
};

export default HowToUse;
