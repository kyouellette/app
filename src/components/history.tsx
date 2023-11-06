import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../style/colors';
import UserCircle from '../../assets/icons/user-circle.svg';

const History = () => {
  return (
    <AvatarContainer>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.View`
  background-color: ${Colors.blackTwo};
  border-radius: 50%;
`;

export default History;
