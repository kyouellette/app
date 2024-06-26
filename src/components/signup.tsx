import styled from 'styled-components/native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import BackHeader from './back-header';
import { Colors } from '../style/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../contexts/auth-context';
import { sbThirty, rSixteen, rEighteen, sbEighteen } from '../style/fonts';

import { TextInput, View } from 'react-native';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dobSelected, setDOBSelected] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const { signUp } = useAuth();

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
  };

  const handleLastNameChange = (text: string) => {
    setLastName(text);
  };

  const handleDateChange = ({type}: {type?: string}, date?: Date) => {
    if (type == 'set') {
      setDateOfBirth(date ? date : new Date());
    } else if(type == 'confirm') {
      setDateOfBirth(date ? date : new Date());
      setDOBSelected(true);
      toggleDatePicker();
    }
    else {
      toggleDatePicker();
    }
  }

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }
 
  const handleSubmit = () => {
    signUp({email, password, firstName, lastName, username});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScreenContainer>
      <BackHeader />
      <ContentContainer>
        <View>
          <TitleContainer>
         <HeaderText>Create an account</HeaderText>
        <SubHeaderText>Join us for a great betting experience</SubHeaderText>
        </TitleContainer>
        <InputContainer>
        <InputField>
        <TextInput
          style={InputStyles}
          value={firstName}
          onChangeText={handleFirstNameChange}
          placeholder="First Name"
          placeholderTextColor={Colors.white}
        />
        </InputField>
        <InputField>
        <TextInput
          style={InputStyles}
          value={lastName}
          onChangeText={handleLastNameChange}
          placeholder="Last Name"
          placeholderTextColor={Colors.white}
        />
        </InputField>
        <InputField>
        <TextInput
          style={InputStyles}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Email Address"
          placeholderTextColor={Colors.white}
        />
        </InputField>
        <InputField>
        <TextInput
          style={InputStyles}
          value={username}
          onChangeText={handleUsernameChange}
          placeholder="Username"
          placeholderTextColor={Colors.white}
        />
        </InputField>
        <InputField>
        <TextInput
          style={InputStyles}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          placeholderTextColor={Colors.white}
          secureTextEntry={showPassword}
        />
        </InputField>
        <InputField>
        <Pressable onPress={toggleDatePicker}>
          <TextInput
          style={InputStyles}
          value={dobSelected ? dateOfBirth.toDateString() : ''}
          placeholder="Date of Birth"
          placeholderTextColor={Colors.white}
          editable={false}
          onPressIn={toggleDatePicker}
        />
        </Pressable>
        </InputField>
        {showPicker && (
        <>
          <DateTimePicker style={DatePickerStyles} textColor={Colors.white} accentColor={Colors.greenOne} mode="date" display="spinner" onChange={handleDateChange} value={dateOfBirth} />
          <PickerOptions>
          <TouchableOpacity onPress={() => handleDateChange({type: 'cancel'}, dateOfBirth)}><CancelText>Cancel</CancelText></TouchableOpacity>
          <TouchableOpacity onPress={() => handleDateChange({type: 'confirm'}, dateOfBirth)}><ConfirmText>Confirm</ConfirmText></TouchableOpacity>
          </PickerOptions>
          </>
          )}
          </InputContainer>
          </View>
          <View style={{paddingBottom: 48}}>
          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Submit</SubmitText>
           </SubmitButton>
           </View>
      </ContentContainer>
    </ScreenContainer>
    </TouchableWithoutFeedback>
  );
}

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${Colors.blackOne};
`;

const PickerOptions = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 12px;
`;

const CancelText = styled.Text`
  color: ${Colors.white};
  ${rEighteen};
`;

const ConfirmText = styled.Text`
  color: ${Colors.greenOne};
  ${rEighteen};
`;


const ContentContainer = styled.View` 
  flex: 1;
  padding-top: 20px;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: column;
  justify-content: space-between;
`;

const InputStyles = {
  height: 40,
  color: Colors.white,
  paddingHorizontal: 10,
  width: 400,
};

const InputContainer = styled.View`
  margin: 24px 0px;
`;

const HeaderText = styled.Text`
  ${sbThirty};
  color: ${Colors.greenOne};
  padding-bottom: 16px;
`;

const SubHeaderText = styled.Text`
  ${rSixteen};
  color: ${Colors.white};
`;

const InputField = styled.View`
  flex-direction: row;
  border-bottom-width: 1px;
  margin-bottom: 12px;
  border-color: ${Colors.blackThree};
`;

const TitleContainer = styled.View``;

const DatePickerStyles = {
  height: 120,
  marginTop: -10,
}

const SubmitButton = styled.TouchableOpacity`
  background-color: ${Colors.greenOne};
  padding: 14px;
  align-items: center;
  border-radius: 8px;
`;

const SubmitText = styled.Text`
  ${sbEighteen};
  color: ${Colors.blackOne};
`;

export default Signup;