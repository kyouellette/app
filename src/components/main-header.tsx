import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../style/colors';

const MainHeader = () => {
    const navigation = useNavigation();
  return (
    <NavHeader>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ContentContainer>
      </ContentContainer>
      </TouchableOpacity>
    </NavHeader>
  );
};

const NavHeader = styled.View`
  background-color: ${Colors.blackOne};
  padding: 16px 0px;
  border-top-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.15);
  border-bottom-width: 4px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
`;

const HorizontalLine = styled.View`
  width: 100%;
  border-bottom-width: 1px;
`

const ContentContainer = styled.View`
  padding-left: 12px;
`

export default MainHeader;
