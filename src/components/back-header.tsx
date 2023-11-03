import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../style/colors';
import Svg, { Path } from 'react-native-svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';

const BackHeader = () => {
    const navigation = useNavigation();
  return (
    <NavHeader>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ContentContainer>
      <ChevronLeft width={24} height={24} />
      </ContentContainer>
      </TouchableOpacity>
    </NavHeader>
  );
};

const NavHeader = styled.View`
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

export default BackHeader;
