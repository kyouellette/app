import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../style/colors';
import FinancialBackground from '../../assets/financial-background.png'
import { rEighteen, rSixteen, sbEighteen, sbSixteen, sbThirty, sbTwenty, sbTwentyFour } from '../style/fonts';
import { useAuth } from '../contexts/auth-context';

const Financial = () => {
  const { user } = useAuth()
  return (
    <ScreenContainer>
      <Header>Balance History</Header>
      <AvailableBalanceContainer source={FinancialBackground}>
        <AvailableBalanceContent>
          <AvailableBalanceText>Available Balance</AvailableBalanceText>
          <BalanceText>${user?.balance}</BalanceText>
          <ButtonContainer>
            <AddButton><ButtonText>Add Money</ButtonText></AddButton>
            <WithdrawButton><ButtonText>Withdraw</ButtonText></WithdrawButton>
          </ButtonContainer>
        </AvailableBalanceContent>
      </AvailableBalanceContainer>
    </ScreenContainer>
  );
};

const Header = styled.Text`
  ${sbTwentyFour};
  color: ${Colors.white};
`;

const ScreenContainer = styled.View`
  padding: 16px;
`;

const AvailableBalanceContainer = styled.ImageBackground`
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
