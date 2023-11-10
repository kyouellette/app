import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../style/colors';
import Avatar from './avatar';
import { useAuth } from '../contexts/auth-context';
import AvatarName from './avatar-name';
import { sbEighteen, sbFourteen } from '../style/fonts';

const getScreenTitle = (screen: string) => {
  switch (screen) {
    case 'Profile':
      return 'Account Information';
    case 'Financial':
      return 'Wallet';
    case 'History':
      return 'My Bets';
    default:
      return screen;
  }
}

const MainHeader = ({screen} : {screen: string}) => {
  const { user } = useAuth();
  return (
    <NavHeader>
        <ContentContainer>
          {screen === 'Home' ? (
            <AvatarName username={user?.username || ''} balance={user?.balance || '0.00'}/>
          ): (
            <ScreenTitle>
              {getScreenTitle(screen)}
            </ScreenTitle>
          )}
      </ContentContainer>
    </NavHeader>
  );
};

const NavHeader = styled.View`
  flex-direction: row;
  background-color: ${Colors.blackOne};
  padding: 16px 24px;
  border-top-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.15);
  border-bottom-width: 4px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
`;

export const ScreenTitle = styled.Text`
  color: ${Colors.white};
  ${sbEighteen};
`;

const ContentContainer = styled.View`
`

export default MainHeader;
