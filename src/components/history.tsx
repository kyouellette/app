import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Colors } from '../style/colors';
import { rEighteen, sbTwentyFour } from '../style/fonts';
import BetHistoryComponent from './bet-history';
import { useAuth } from '../contexts/auth-context';
import { Bet } from '../types';

const History = () => {
  const { getBets } = useAuth()
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserBets = async () => {
      try {
        const betsData = await getBets();
        if (betsData) {
          setBets(betsData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching bets:', error);
      }
    };
    getUserBets();
  }, []);

  const isEmpty = bets?.length === 0
  return (
    <ScreenContainer>
      <Header>Your Betting History</Header>
      {loading && (
        <ActivityIndicator size="large" color={Colors.greenOne} style={{marginTop: 64, marginLeft: -8}} />
      )}
      {!loading && (
              <ContentContainer>
      {isEmpty && (
        <EmptyContainer>
          <EmptyText>Place a bet to view history</EmptyText>
        </EmptyContainer>
      )}
      {!isEmpty && (
        <BetHistoryContainer>
        <ScrollView>
      {bets.map((bet, index) => (
        <ComponentWrapper key={index}>
          <BetHistoryComponent bet={bet}/>
        </ComponentWrapper>
      ))}     
        </ScrollView>   
        </BetHistoryContainer>
      )}
      </ContentContainer>
       )}
    </ScreenContainer>
  );
};

const Header = styled.Text`
  ${sbTwentyFour};
  color: ${Colors.white};
  padding-left: 8px;
`;

const BetHistoryContainer = styled.View`
  flex: 1;
`;

const ScreenContainer = styled.View`
  flex: 1;
  padding-top: 16px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 78px;
`;

const ComponentWrapper = styled.View`
  margin-bottom: 16px;
`
const ContentContainer = styled.View`
  flex: 1;
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
