import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../style/colors';
import UserCircle from '../../assets/icons/user-circle.svg';

const Avatar = ({width, height}: {width?: number, height?: number}) => {
  return (
    <AvatarContainer>
        <UserCircle width={width || 42} height={height || 42} />
    </AvatarContainer>
  );
};

const AvatarContainer = styled.View`
  background-color: ${Colors.blackTwo};
  border-radius: 50%;
`;

export default Avatar;
