import React from 'react';
import styled from 'styled-components/native';
import { Colors } from '../style/colors';
import Avatar from './avatar';
import { sbFourteen } from '../style/fonts';
import Fire from '../../assets/icons/fire.svg'

const AvatarName = ({username, balance} : {username: string, balance: string}) => {
  return (
    <Container>
        <Avatar />
        <NameAndBalance>
            <NameContainer>{username}</NameContainer>
            <BalanceContainer>
            <Fire width={18} height={18} color={Colors.greenOne} />
            <BalanceOnlyContainer>
            {balance}
            </BalanceOnlyContainer>
            </BalanceContainer>
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

const BalanceOnlyContainer = styled.Text`
    margin-top: 4px;
`;

const BalanceContainer = styled.Text`
    flex-direction: row;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: ${Colors.greenOne};
    ${sbFourteen}
`;

export default AvatarName;
