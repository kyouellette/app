import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../style/colors';
import Avatar from './avatar';
import { sbFourteen } from '../style/fonts';

const AvatarName = ({username, balance} : {username: string, balance: string}) => {
  return (
    <Container>
        <Avatar />
        <NameAndBalance>
            <NameContainer>{username}</NameContainer>
            <BalanceContainer>${balance}</BalanceContainer>
        </NameAndBalance>
    </Container>
  );
};

const Container = styled.View`
    flex-direction: row;
`;

const NameAndBalance = styled.View`
    padding-left: 8px;
    flex-direction: column;
    justify-content: space-between;
`

const NameContainer = styled.Text`
    color: ${Colors.white};
    ${sbFourteen}
`;

const BalanceContainer = styled.Text`
    color: ${Colors.greenOne};
    ${sbFourteen}
`;

export default AvatarName;
