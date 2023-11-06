import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/auth-context';
import { Colors } from '../style/colors';
import MainHeader from './main-header';
import ProfileIcon from '../../assets/icons/user.svg';
import LogoutIcon from '../../assets/icons/logout-1.svg';
import TermsIcon from '../../assets/icons/document-text.svg';
import UseIcon from '../../assets/icons/information-circle.svg';
import Avatar from './avatar';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import { mSixteen, sbTwentyFour } from '../style/fonts';
import React from 'react';

const Profile = () => {
  const { signOut } = useAuth()
  const handleLogout = () => {
    signOut();
  }

  const ProfileOptions = [{
    name: 'Personal Information',
    icon: <ProfileIcon width={24} height={24}/>
},
{
    name: 'Terms & Conditions',
    icon: <TermsIcon />
},
{
    name: 'How to Use',
    icon: <UseIcon />
}]

  return (
    <ScreenContainer> 
      <ContentContainer>
      <AvatarNameContainer>
      <AvatarContainer>
        <Avatar width={64} height={64} />
      </AvatarContainer>
      <NameContainer>{'Kyle'}</NameContainer>
      </AvatarNameContainer>
        <OptionsWrapper>
        {ProfileOptions.map((option, index) => (
            <>
      <OptionContainer key={index}>
            <IconAndTitleContainer>
            <IconContainer>
        {React.cloneElement(option.icon, {
          color: Colors.greenOne, // Set the fill color conditionally
        })}
            </IconContainer>
            <Title>{option.name}</Title>
            </IconAndTitleContainer>
            <ChevronRight color={Colors.blackThree}/>
      </OptionContainer>
      <LineSeparator />
      </>
    ))}
    <LogoutOptionContainer onPress={() => handleLogout()}>
    <IconAndTitleContainer>
            <IconContainer>
        <LogoutIcon width={24} height={24} color={Colors.greenOne} />
            </IconContainer>
            <LogoutTitle>{'Log out'}</LogoutTitle>
            </IconAndTitleContainer>
    </LogoutOptionContainer>
        </OptionsWrapper>
      </ContentContainer>
    </ScreenContainer>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  background-color: ${Colors.blackOne};
`;

const ContentContainer = styled.View`
    padding-right: 16px;
    padding-top: 32px;
    padding-left: 16px;
`;

const AvatarNameContainer = styled.View`
    flex-direction: column;
    align-items: center;
`;

const IconAndTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    color: ${Colors.white};
    padding-bottom: 6px;
`;

const Title = styled.Text`
    color: ${Colors.white};
    ${mSixteen};
    padding-left: 12px;
`;

const LogoutTitle = styled.Text`
    color: ${Colors.greenOne};
    ${mSixteen};
    padding-left: 12px;
`;

const AvatarContainer = styled.View`
    border-radius: 50%;
    border-width: 2px;
    border-color: ${Colors.greenOne};
    margin-bottom: 12px;
`;

const NameContainer = styled.Text`
    ${sbTwentyFour};
    color: ${Colors.white};
`;

const IconContainer = styled.View`
`;

const OptionsWrapper = styled.View`
    padding-top: 32px;
    flex-direction: column;
`;

const OptionContainer = styled.TouchableOpacity`
  margin-top: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${Colors.blackThree};
  padding-bottom: 6px;
`;

const LineSeparator = styled.View`
    border-top-width: 1px;
    border-color: ${Colors.blackThree};
    flex: 1;
`;

const LogoutOptionContainer = styled.TouchableOpacity`
  margin-top: 32px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6px;
`;


export default Profile