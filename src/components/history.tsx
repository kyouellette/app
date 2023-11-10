import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { Colors } from '../style/colors';
import { rEighteen, sbTwentyFour } from '../style/fonts';
import BetHistoryComponent from './bet-history';

const History = () => {
  const bets = [{
    id: 'abcdef',
    gameTitle: 'Call of Duty: MW2',
    totalBetAmount: '200.00',
    winnings: '300.00',
    status: 'Won',
    betsPlaced: [{
      category: 'Kills',
      value: '15',
    },
    {
      category: 'Placement',
      value: '1',
    }]
  },
  {
    id: 'abcdef',
    gameTitle: 'Call of Duty: MW2',
    totalBetAmount: '200.00',
    winnings: '',
    status: 'Pending',
    betsPlaced: [{
      category: 'Kills',
      value: '15',
    },
    {
      category: 'Placement',
      value: '1',
      won: false,
    }]
  },
  {
    id: 'abcdef',
    gameTitle: 'Call of Duty: MW2',
    totalBetAmount: '200.00',
    winnings: '0.00',
    status: 'Lost',
    betsPlaced: [{
      category: 'Kills',
      value: '15',
    },
    {
      category: 'Placement',
      value: '1',
    }]
  }]
  const isEmpty = bets.length === 0
  return (
    <ScreenContainer>
      <Header>Your Betting History</Header>
      <ScrollView>
      <ContentContainer>
      {isEmpty && (
        <EmptyContainer>
          <EmptyText>Place a bet to view history</EmptyText>
        </EmptyContainer>
      )}
      {!isEmpty && (
        <BetHistoryContainer>
      {bets.map((bet, index) => (
        <ComponentWrapper key={index}>
          <BetHistoryComponent bet={bet}/>
        </ComponentWrapper>
      ))}        
        </BetHistoryContainer>
      )}
      </ContentContainer>
      </ScrollView>
    </ScreenContainer>
  );
};

const Header = styled.Text`
  ${sbTwentyFour};
  color: ${Colors.white};
`;

const BetHistoryContainer = styled.View`
  flex-direction: column;
`;

const ScreenContainer = styled.View`
  padding-top: 16px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 168px;
`;

const ComponentWrapper = styled.View`
  margin-bottom: 16px;
`
const ContentContainer = styled.View`
  padding-top: 16px;
  flex-direction: column;
`;

const EmptyContainer = styled.View`
  padding-top:  64px;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: ${Colors.white};
  ${rEighteen};
`;

export default History;
