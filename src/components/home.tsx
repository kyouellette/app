import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { Colors } from '../style/colors';
import { rEighteen, sbTwentyFour } from '../style/fonts';
import TwitchStreamThumbnail from './twitch-stream-thumbnail';
import { getTwitchStreams } from '../api/api';

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
  const [streams, setStreams] = useState<StreamData[]>([])

  useEffect(() => {
    async function loadTwitchStreams() {
      const twitchStreams = await getTwitchStreams();
      setStreams(twitchStreams);
    }

    loadTwitchStreams();
  }, []);

  const isEmpty = streams.length === 0
  return (
    <ScreenContainer>
      <Header>Featured Streams</Header>
      <ContentContainer>
      {isEmpty && (
        <EmptyContainer>
          <EmptyText>There are no streamers to bet on</EmptyText>
        </EmptyContainer>
      )}
      {!isEmpty && (
        <FeaturedStreamScroll horizontal={true}>
      {streams.map((stream: StreamData, index: number) => (
        <ComponentWrapper key={index}>
          <TwitchStreamThumbnail stream={stream} />
        </ComponentWrapper>
      ))}        
        </FeaturedStreamScroll>
      )}
      </ContentContainer>
    </ScreenContainer>
  );
};

const Header = styled.Text`
  padding-left: 8px;
  ${sbTwentyFour};
  color: ${Colors.white};
`;

const ScreenContainer = styled.View`
  padding-top: 16px;
  padding-right: 8px;
  padding-bottom: 168px;
`;

const FeaturedStreamScroll = styled.ScrollView`
`;

const ComponentWrapper = styled.View`
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
