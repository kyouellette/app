import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Pressable } from 'react-native';
import { Colors } from '../style/colors';
import { rEighteen, sbTwentyFour } from '../style/fonts';
import TwitchStreamThumbnail from './twitch-stream-thumbnail';
import { getTwitchStreams } from '../api/api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/app-stack';

type StreamData = {
  id?: string;
  user_id?: string;
  user_login?: string;
  user_name?: string;
  game_id?: string;
  game_name?: string;
  type?: string;
  title?: string;
  tags?: string[];
  viewer_count?: number;
  started_at?: string;
  thumbnail_url?: string;
  tag_ids?: string[];
  is_mature?: boolean;
}

const Home = () => {
  const [loading, setisLoading] = useState(true);
  const [streams, setStreams] = useState<StreamData[]>([])
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    async function loadTwitchStreams() {
      const twitchStreams = await getTwitchStreams();
      if (Array.isArray(twitchStreams) && twitchStreams.some(stream => stream !== undefined)) {
        setStreams(twitchStreams);
      }
      setisLoading(false);
    }

    loadTwitchStreams();
  }, []);

  const isEmpty = streams.length === 0
  return (
    <ScreenContainer>
      <StreamsContainer>
      <Header>Featured Streams</Header>
      <ContentContainer>
      {loading && (
         <ActivityIndicator size="large" color={Colors.greenOne} style={{marginTop: 32}} />
      )}
      {isEmpty && !loading && (
        <EmptyContainer>
          <EmptyText>There are no streamers to bet on</EmptyText>
        </EmptyContainer>
      )}
      {!isEmpty && !loading && (
        <FeaturedStreamScroll horizontal={true}>
      {streams.map((stream: StreamData, index: number) => (
        <ComponentWrapper onPress={() => {
          navigation.navigate('Bet', stream);
        }}key={index}>
          <TwitchStreamThumbnail stream={stream} />
        </ComponentWrapper>
      ))}        
        </FeaturedStreamScroll>
      )}
      </ContentContainer>
      </StreamsContainer>
      {/* {!loading && (
      <CategoryContainer>
      <Header>Featured Streams</Header>
      </CategoryContainer>
      )} */}
    </ScreenContainer>
  );
};

const Header = styled.Text`
  padding-left: 8px;
  ${sbTwentyFour};
  color: ${Colors.white};
`;

const StreamsContainer = styled.View`

`;

const CategoryContainer = styled.View`
  
`;

const ScreenContainer = styled.View`
  flex: 1;
  padding-top: 16px;
  padding-right: 8px;
  padding-bottom: 168px;
  justify-content: space-between;
`;

const FeaturedStreamScroll = styled.ScrollView`
`;

const ComponentWrapper = styled.Pressable`
  flex: 1;
  padding-left: 8px;
`
const ContentContainer = styled.View`
  padding-top: 16px;
  flex-direction: column;
`;

const EmptyContainer = styled.View`
  padding-top:  64px;
  align-items: center;
`;

const EmptyText = styled.Text`
  color: ${Colors.white};
  ${rEighteen};
`;

export default Home;
