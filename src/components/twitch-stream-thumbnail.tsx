import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';
import LiveComponent from './live-component';
import { Colors } from '../style/colors';
import { mFourteen, mSixteen, rTwelve } from '../style/fonts';
import Viewers from './viewers-component';
import TwitchIcon from '../../assets/icons/twitch-2.svg';

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

function truncateText(text: string, maxLength: number): string {
  if (text.length || 0 > maxLength) {
    return text.slice(0, maxLength) + '...';
  } else {
    return text;
  }
}

const TwitchStreamThumbnail = (props: { stream: StreamData }) => {
  const { stream } = props;
  const thumbnailUrl = stream?.thumbnail_url?.replace('{width}', '326').replace('{height}', '168');

  return (
    <ContainerWrapper>
      {stream?.thumbnail_url && (
        <ComponentWrapper>
      <StreamThumbnail source={{uri: thumbnailUrl}} >
        <LiveComponent />
      </StreamThumbnail>
      <StreamTitleWrapper>
        <GreenSquare />
        <StreamTitle>{truncateText(stream?.title || '', 32)}</StreamTitle>
      </StreamTitleWrapper>
      <GameTitle>{stream?.game_name}</GameTitle>
      <ViewersContainer>
        <StreamerDetailsContainer>
        <TwitchIcon width={24} height={24} />
        <StreamerUsername>{stream?.user_name}</StreamerUsername>
        </StreamerDetailsContainer>
        <Viewers viewers={stream?.viewer_count} />
      </ViewersContainer>
      </ComponentWrapper>
      )}
    </ContainerWrapper>
  );
}

const ContainerWrapper = styled.View`
  flex-direction: column;
  padding: 6px;
  background-color: ${Colors.blackTwo};
  border-radius: 8px;
`;

const ComponentWrapper = styled.View`
  flex-direction: column;
`;

const ViewersContainer = styled.View`
  padding-top: 4px;
  padding-left: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

const StreamerDetailsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const StreamThumbnail = styled.ImageBackground`
  height: 168px;
  width: 326px;
  align-items: flex-start;
  padding: 8px;
  border-radius: 8px;
  overflow: hidden;
`;

const StreamerUsername = styled.Text`
  padding-left: 4px;
  ${mFourteen};
  color: ${Colors.white};
`;

const StreamTitle = styled.Text`
  ${mSixteen};
  color: ${Colors.white};
  padding-left: 8px;
`;

const GreenSquare = styled.View`
  height: 24px;
  border: 6px ${Colors.greenOne};
  border-radius: 2px;
`;

const StreamTitleWrapper = styled.View`
  flex-direction: row;
  padding-top: 12px;
  align-items: center;
  overflow: hidden;
`;

const GameTitle = styled.Text`
  padding-top: 4px;
  padding-left: 20px;
  color: ${Colors.blackFour};
  ${rTwelve};
`;

export default TwitchStreamThumbnail;