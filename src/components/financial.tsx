import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Colors } from '../style/colors';
import FinancialBackground from '../../assets/financial-background.png';
import { rSixteen, sbEighteen, sbSixteen, sbThirty, sbTwenty, sbTwentyFour } from '../style/fonts';
import { useAuth } from '../contexts/auth-context';
import { ActivityIndicator } from 'react-native';

const Financial = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const { user } = useAuth();

  return (
    <ScreenContainer>
      <Header>Balance History</Header>
      <ImageContainer source={FinancialBackground} onLoad={handleImageLoad}>
        <AvailableBalanceContent>
        {isLoading && (
            <ActivityIndicator size="large" color={Colors.greenOne} style={{marginTop: 64}} />
          )}
          {!isLoading && (
            <>
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
            </>
          )}
        </AvailableBalanceContent>
      </ImageContainer>
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
