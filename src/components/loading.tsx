import styled from 'styled-components/native';
import { Text } from 'react-native';

export const Loading = () => {
  return (
    <ScreenContainer>
      <Text>Loading</Text>
    </ScreenContainer>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
`;

export default Loading