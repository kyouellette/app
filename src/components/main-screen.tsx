import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth-context';
import { Colors } from '../style/colors';
import MainHeader from './main-header';
import React, { useState } from 'react';
import Financial from './financial';
import HomeIcon from '../../assets/icons/home.svg'
import FinancialIcon from '../../assets/icons/currency-dollar.svg';
import HistoryIcon from '../../assets/icons/clock.svg';
import History from './history';
import ProfileIcon from '../../assets/icons/user.svg';
import { FooterContainer, ContainerOption, ContentContainer } from './footer.styles';
import { useRoute } from '@react-navigation/native';
import Home from './home';
import Profile from './profile';

const getScreenState = (screen: string) => {
  if (screen === 'Home') {
    return (
      <Home />
    )
  }
    if (screen === 'Financial') {
      return (
        <Financial />
      )
  }
  if (screen === 'History') {
    return (
      <History />
    )
}
if (screen === 'Profile') {
  return (
    <Profile />
  )
}
}

export const Main = () => {
  const [screenState, setScreenState] = useState('Home');
  return (
    <ScreenContainer> 
      <MainHeader screen={screenState}/>
      {getScreenState(screenState)}
      <Footer screenState={screenState} setScreenState={setScreenState} />
    </ScreenContainer>
  );
}

const Footer = ({screenState, setScreenState}: {screenState: string, setScreenState: React.Dispatch<React.SetStateAction<string>>}) => {

  function isOptionSelected(optionName: string, currentScreen: string) {
  return optionName === currentScreen;
  }

  const FooterOptions = [{
      name: 'Home',
      icon: <HomeIcon width={32} height={32}/>,
  },
  {
      name: 'Financial',
      icon: <FinancialIcon width={32} height={32}/>
  },
  {
      name: 'History',
      icon: <HistoryIcon width={32} height={32}/>
  },
  {
      name: 'Profile',
      icon: <ProfileIcon width={32} height={32}/>
  }]
return (
  <FooterContainer>
      <ContentContainer>
      {FooterOptions.map((option, index) => (
    <ContainerOption key={index} selected={isOptionSelected(option.name, screenState)}>
      <TouchableOpacity disabled={false} onPress={() => setScreenState(option.name)}>
      {React.cloneElement(option.icon, {
        color: isOptionSelected(option.name, screenState) ? Colors.blackOne : 'white', // Set the fill color conditionally
      })}
      </TouchableOpacity>
    </ContainerOption>
  ))}
    </ContentContainer>
  </FooterContainer>
);
};

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${Colors.blackOne};
`;

export default Main