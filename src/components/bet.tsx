import styled from 'styled-components/native';
import React, { useEffect, useRef, useState } from 'react';

import { Colors } from '../style/colors';
import { sbThirty, rEighteen, sbTwelve, sbFourteen, sbEighteen, sbTwentyFour, sbTwenty, mEighteen } from '../style/fonts';
import BackHeader from './back-header';
import { useAuth } from '../contexts/auth-context';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/app-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import WebView from 'react-native-webview';
import { getOpenBetGroup, placeBet } from '../api/api';
import { ActivityIndicator, Keyboard, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { BetGroup, BetOption } from '../types';

type BetScreenRouteProp = RouteProp<AppStackParamList, 'Bet'>;

type BetScreenProps = {
    route?: BetScreenRouteProp;
  };

const Bet = ({ route }: BetScreenProps) => {
    const channel = route?.params?.user_name;
    const game = route?.params?.game_name;
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const [betAmount, setBetAmount] = useState('');
    const [winAmount, setWinAmount] = useState('');
    const [payoutMultiplier, setPayoutMultiplier] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, { value: string; payoutMultiplier: number } | null>>({});
    const [betGroupData, setBetGroupData] = useState<BetGroup>();

  const handleSubmit = async () => {
    const betOptions = Object.entries(selectedOptions).map(([category, option]) => {
      if (option && typeof option === 'object') {
        const { value } = option;
        return { category, value: parseFloat(value)};
      } else {
        return { category, value: 0 }; // Adjust the default values accordingly
      }
    });
    
    try {
      placeBet(user?.userId, betGroupData?.id, channel, game, betAmount, betOptions )
      setSelectedOptions({});
      setBetAmount('');
      setWinAmount('');
    } catch (error) {
      return
    }
  };

  const handleBetAmountChange = (text: string) => {
    setBetAmount(text);
  }
useEffect(() => {
  const betAmountNumber = parseFloat(betAmount) || 0;
  const validBetAmount = Math.max(0, betAmountNumber);
  const selectedOptionsArray = Object.values(selectedOptions)
    .filter((option) => option !== null && typeof option === 'object')
    .map((option) => {
      const { value, payoutMultiplier } = option!;
      return { value, payoutMultiplier };
    });
  const payoutMultiplierSum = selectedOptionsArray.reduce((sum, option) => sum + option.payoutMultiplier, 0);
  const calculatedWinAmount = validBetAmount * payoutMultiplierSum;
  setWinAmount(calculatedWinAmount.toFixed(2));
}, [betAmount, payoutMultiplier, selectedOptions]);

  
  


  useEffect(() => {
    const fetchBetGroup = async () => {
      try {
        const openBetGroup = await getOpenBetGroup(channel);
        if (openBetGroup !== betGroupData) {
          setBetGroupData(openBetGroup);
        }
      } catch (error) {
        console.error('Error fetching open bet group:', error);
      }
    };
  
    fetchBetGroup();
  
    const intervalId = setInterval(() => {
      fetchBetGroup();
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, []);
  

  const groupedData: Record<string, BetOption[]> = (betGroupData?.betOptions || []).reduce((acc, item) => {
    const { category } = item;
    acc[category] = [...(acc[category] || []), item];
    return acc as Record<string, BetOption[]>;
  }, {});

  const handleOptionPress = (
    category: string,
    value: string,
    payoutMultiplier: number
  ) => {
    setSelectedOptions((prevSelectedOptions) => {
      const isSelected = prevSelectedOptions[category]?.value === value;
  
      return {
        ...prevSelectedOptions,
        [category]: isSelected
          ? null
          : { value, payoutMultiplier },
      };
    });
  };
  
  

  const embedOptions = {
    channel: channel, // Replace with the desired Twitch channel name
    layout: 'video',
    width: '100%',
    height: '100%',
    theme: 'dark',
    allowfullscreen: false,
    muted: true,
    autoplay: true,
    parent: ['your-domain.com'], // Replace with your actual domain
  };

  const categoryNameMap = {
    Kills: 'How many kills?',
    Placement: 'What place?'
  }

  const embedUrl = `https://player.twitch.tv/?channel=${embedOptions.channel}&layout=${embedOptions.layout}&width=${embedOptions.width}&height=${embedOptions.height}&theme=${embedOptions.theme}&autoplay=${embedOptions.autoplay}&allowfullscreen=${embedOptions.allowfullscreen}&muted=${embedOptions.muted}&parent=${embedOptions.parent.join(',')}`;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScreenContainer>
      <BackHeader />
      <WebViewContainer>
          {isLoading && (
            <ActivityIndicator size="large" color={Colors.greenOne} style={{marginTop: 64}} />
          )}
          <WebView
            playsInline
            onShouldStartLoadWithRequest={() => isLoading}
            allowsInlineMediaPlayback={true}
            allowsFullscreenVideo={false}
            source={{ uri: embedUrl }}
            style={isLoading ? { flex: 0, height: 0, opacity: 0 } : {flex: 1}}
            onLoadStart={() => setIsLoading(true)}
            onLoad={() => setIsLoading(false)}
          />
        </WebViewContainer>
        <KeyboardAwareScrollView
      extraScrollHeight={80} // Adjust this value as needed
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
        {!betGroupData && !isLoading && (
          <BettingClosedContainer>
            <BettingClosed>Bets are currently closed</BettingClosed>
            <BettingClosedSub>Wait until the next round</BettingClosedSub>
          </BettingClosedContainer>
        )}
        {betGroupData && (<ContentContainer style={{opacity: isLoading ? 0 : 1}}>
          <BetsContainer>
          <BetsTitle>Place your bets</BetsTitle>
          <BetOptionContainer>
      {Object.entries(groupedData).map(([category, items]) => {
        return (
          <CategoryContainer key={category}>
            <CategoryTitle>{categoryNameMap[category as keyof typeof categoryNameMap]}</CategoryTitle>
            <OptionButtonContainer>
            {items
        .sort((a, b) => (category === 'Placement' ? b.value - a.value : a.value - b.value))
        .map((item) => (
    <BetChoiceContainer key={item.value}>
      <OptionButton
        onPress={() => handleOptionPress(category, String(item.value), item.payoutMultiplier)}
        isSelected={selectedOptions[category]?.value === String(item.value)}
      >
               <ButtonText>{String(item.value)}</ButtonText>
                </OptionButton>
                </BetChoiceContainer>
              ))}
            </OptionButtonContainer>
          </CategoryContainer>
        );
      })}
    </BetOptionContainer>
          </BetsContainer>
        <BettingContainer>
          <BetInputRow>
          <InputWrapper style={{marginRight: 8}}>
        <InputDollarText>$</InputDollarText>
        <TextInput
          style={InputStyles}
          value={betAmount}
          onChangeText={handleBetAmountChange}
          placeholder="Enter bet amount"
          placeholderTextColor={Colors.blackThree}
        />
        </InputWrapper>
        <InputWrapper style={{marginLeft: 8}}>
        <InputDollarText>$</InputDollarText>
        <TextInput
          style={InputStyles}
          value={winAmount}
          placeholder="0.00"
          placeholderTextColor={Colors.blackThree}
          editable={false}
        />
        </InputWrapper>
        </BetInputRow>
        <SubmitButton onPress={handleSubmit}>
          <SubmitText>Place Bet</SubmitText>
        </SubmitButton>   
        </BettingContainer> 
      </ContentContainer>)}
      </KeyboardAwareScrollView>
    </ScreenContainer>
    </TouchableWithoutFeedback>
  );
};

const ScreenContainer = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${Colors.blackOne};
`;

const BetsContainer = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;


const OptionButton = styled.Pressable<{ isSelected: boolean }>`
  height: 44px;
  margin-top: 8px;
  background-color: ${(props) => (props.isSelected ? Colors.blackTwo : Colors.blackThree)};
  border: 1px ${Colors.blackTwo};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;


const styles = {
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  }
};

const BettingClosed = styled.Text`
  ${sbTwentyFour};
  color: ${Colors.white};
`;

const BettingClosedSub = styled.Text`
  ${mEighteen};
  color: ${Colors.white};
`;

const BettingClosedContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BetChoiceContainer = styled.View`
  flex-direction: row;
  flex: 1;
  padding-top: 8px;
`;

const ButtonText = styled.Text`
  ${rEighteen};
  color: ${Colors.white};
`;

const BetsTitle = styled.Text`
  padding-top: 16px;
  margin-left: -16px;
  ${sbTwentyFour};
  color: ${Colors.white};
  align-self: center;
`;

const BetOptionContainer = styled.View`
  flex-direction: column;
  flex: 1;
  padding-top: 32px;
`;

const BetInputRow = styled.View`
  flex-direction: row;
`;
const OptionButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`

const InputWrapper = styled.View`
  flex-direction: row;
  padding-left: 8px;
  flex: 1;
  border: 1px ${Colors.blackThree};
  align-items: center;
  border-radius: 8px;
`;
const ContentContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding-bottom: 48px;
`

const CategoryTitle = styled.Text`
  ${sbEighteen};
  color: ${Colors.white};
`;

const CategoryContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
`;

const BettingContainer = styled.View`
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
    width: 100%;
`;

const WebViewContainer = styled.View`
    width: 100%;
    height: 209px;
`;

const InputStyles = {
  height: 40,
  color: Colors.white,
  paddingHorizontal: 10,
  flex: 1,
};

const InputDollarText = styled.Text`
  color: ${Colors.greenOne};
  ${sbEighteen}
`

const SubmitButton = styled.TouchableOpacity`
  background-color: ${Colors.greenOne};
  width: 100%;
  padding: 14px;
  margin-top: 32px;
  align-items: center;
  border-radius: 8px;
`;

const SubmitText = styled.Text`
  ${sbTwelve};
  color: ${Colors.blackOne};
`;

export default Bet;