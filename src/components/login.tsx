import styled from 'styled-components/native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable } from 'react-native';
import { AuthStackParamList } from '../navigation/auth-stack';

import { Colors } from '../style/colors';
import { sbThirty, rEighteen, rEight, sbEighteen } from '../style/fonts';
import circlesDesignImage from '../../assets/circles-design.png';

import { TextInput, View } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <ScreenContainer>
      <BackgroundImage source={circlesDesignImage} />
      <ContentContainer>
        <View>
      <HeaderContainer>
        <MainHeader>Welcome to</MainHeader>
        <SubHeader>StreamBet</SubHeader>
      </HeaderContainer>
      <InputContainer>
      <EmailInputContainer>
        <TextInput
          style={InputStyles}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email Address"
          placeholderTextColor={Colors.white}
        />
        </EmailInputContainer>
        <PasswordInputContainer>
        <TextInput
          style={InputStyles}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          placeholderTextColor={Colors.white}
          secureTextEntry={showPassword}
        />
        </PasswordInputContainer>
      </InputContainer>
      <SubmitButton onPress={handleSubmit}>
        <SubmitText>Sign in</SubmitText>
      </SubmitButton>
      </View>
      <View>
      <SignUpContainer>
        <SignUpPreText>Don't have an account? </SignUpPreText>
        <Pressable
      onPress={() => {
        navigation.navigate('Signup');
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
        <SignUpText>Sign Up</SignUpText>
        </Pressable>
      </SignUpContainer>
      </View>
      </ContentContainer>
    </ScreenContainer>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${Colors.blackOne};
  padding-top: 120px;
`;
const ContentContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-left: 24px;
  margin-right: 24px;
`

const MainHeader = styled.Text`
  ${rEighteen};
  color: ${Colors.white};
`;

const HeaderContainer = styled.View`
`;

const SubHeader = styled.Text`
  ${sbThirty};
  padding-top: 12px;
  color: ${Colors.greenOne};
`;

const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
`;

const InputContainer = styled.View`
  margin: 48px 0px;
`;

const InputStyles = {
  height: 40,
  color: Colors.white,
  paddingHorizontal: 10,
  width: 400,
};

const EmailInputContainer = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  margin-bottom: 20px;
  border-color: ${Colors.blackThree};
`;

const PasswordInputContainer = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${Colors.blackThree};
`

const SubmitButton = styled.TouchableOpacity`
  background-color: ${Colors.greenOne};
  padding: 14px;
  align-items: center;
  border-radius: 8px;
`;

const SignUpContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-bottom: 48px;
`

const SignUpPreText = styled.Text`
  color: ${Colors.white};
  ${rEighteen};
`

const SignUpText = styled.Text`
  color: ${Colors.greenOne};
  ${sbEighteen};
`;

const SubmitText = styled.Text`
  ${sbEighteen};
  color: ${Colors.blackOne};
`;

export default Login;