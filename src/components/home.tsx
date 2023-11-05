import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth-context';
import { Colors } from '../style/colors';
import MainHeader from './main-header';

export const HomeScreen = () => {
  const { signOut } = useAuth()
  const handleLogout = () => {
    signOut();
  }
  return (
    <ScreenContainer> 
      <MainHeader />
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogout}><Text>Log Out</Text></TouchableOpacity>
    </ScreenContainer>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${Colors.blackOne};
`;

export default HomeScreen