import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../style/colors';
import FinancialBackground from '../../assets/financial-background.png';
import { rEight, rSixteen, rTwelve, sbEighteen, sbSixteen, sbThirty, sbTwenty, sbTwentyFour } from '../style/fonts';
import { useAuth } from '../contexts/auth-context';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Transaction } from '../types';

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];


const Financial = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getTransactions } = useAuth();

  useEffect(() => {
    const getUserBets = async () => {
      try {
        const transactions = await getTransactions();
        if (transactions) {
          setTransactions(transactions);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching bets:', error);
      }
    };
    getUserBets();
  }, []);


  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const { user } = useAuth();

  return (
    <ScreenContainer>
      <Header>Your Wallet</Header>
        {isLoading && (
            <ActivityIndicator size="large" color={Colors.greenOne} style={{marginTop: 64}} />
          )}
          {!isLoading && (
            <ContentContainer>
          <ImageContainer source={FinancialBackground}>
        <AvailableBalanceContent>
              <AvailableBalanceText>Available Balance</AvailableBalanceText>
              <BalanceText>${user?.balance}</BalanceText>
              <ButtonContainer>
                <AddButton>
                  <ButtonText>Add Money</ButtonText>
                </AddButton>
                <WithdrawButton>
                  <ButtonText>Withdraw</ButtonText>
                </WithdrawButton>
              </ButtonContainer>
              </AvailableBalanceContent>
              </ImageContainer>
              <HistoryContainer>
              <Header style={{paddingBottom: 16}}>Transaction History</Header>
                 <ScrollView>
                  <TransactionsContainer>
                    {transactions.map((transaction, index) => (
                      <>
                      <TransactionItem key={index}>
                        <LeftContainer>
                        <DateContainer>{transaction?.createdAt
                              ? `${months[new Date(transaction.createdAt).getMonth() - 1]} ${new Date(transaction.createdAt).getDate()}, ${new Date(transaction.createdAt).getFullYear()}`
                              : ''}</DateContainer>
                          <TransactionId>{transaction?.id}</TransactionId>
                        </LeftContainer>
                        <AmountContainer color={transaction?.type === 'add' ? Colors.greenOne : Colors.redOne}>
                          {transaction?.type === 'add' ? '+' : '-'}${new Number(transaction?.amount).toFixed(2)}
                          </AmountContainer>
                      </TransactionItem>
                          {!(index + 1 === transactions.length) && (
                          <Separator />
                          )}
                        </>
                    ))}
                    </TransactionsContainer>
                </ScrollView>
                </HistoryContainer>
                </ContentContainer>
          )}
    </ScreenContainer>
  );
};

const Header = styled.Text`
  ${sbTwentyFour};
  color: ${Colors.white};
`;

const Separator = styled.View`
  border-bottom-width: 1px;
  border-color: ${Colors.blackThree};
  margin-bottom: 16px;
  margin-top: 8px;
`;

const ContentContainer = styled.View`
  padding-top: 16px;
  flex-direction: column;
`;

const HistoryContainer = styled.View`
  padding-top: 16px;
`;

const TransactionItem = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const TransactionsContainer = styled.View`
  justify-content: space-between;
`;

const DateContainer = styled.Text`
  color: ${Colors.white};
`;

const TransactionId = styled.Text`
  ${rTwelve};
  color: ${Colors.blackThree};
  padding-top: 8px;
  padding-bottom: 8px;
`;

const AmountContainer = styled.Text<{ color: string }>`
  color: ${(props) => (props.color)};
`;

const LeftContainer = styled.View`
  flex-direction: column;
`;

const ScreenContainer = styled.View`
  flex: 1;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 640px;
`;

const ImageContainer = styled.ImageBackground`
  margin-top: 16px;
  border-radius: 16px;
  overflow: hidden;
`;

const AvailableBalanceContent = styled.View`
  padding: 16px;
`;

const BalanceText = styled.Text`
  margin-top: 16px;
  color: ${Colors.white};
  ${sbThirty};
`;

const ButtonContainer = styled.View`
  margin-top: 64px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0px;
  border-radius: 12px;
  margin-right: 8px;
  background-color: ${Colors.greenOne};
  align-items: center;
`;

const WithdrawButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px 0px;
  margin-left: 8px;
  border-radius: 12px;
  background-color: ${Colors.greenOne};
  align-items: center;
`;

const ButtonText = styled.Text`
  ${sbEighteen}
  color: ${Colors.blackOne};
`;

const AvailableBalanceText = styled.Text`
  color: ${Colors.white};
  ${rSixteen};
`;

export default Financial;
