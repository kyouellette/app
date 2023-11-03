import styled from 'styled-components/native';
import { Text } from 'react-native';

export const HomeScreen = () => {
  return (
    <ScreenContainer>
      <Text>Home</Text>
    </ScreenContainer>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: lightblue;
`;

export default HomeScreen