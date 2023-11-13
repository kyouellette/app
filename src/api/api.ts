// apiService.ts
import axios from 'axios';
import { Bet, BetGroup, BetsPlaced } from '../types';

const userApiClient = axios.create({
  baseURL: 'https://streambet-user.up.railway.app/api/user', // Base URL of your NestJS server
});

const walletApiClient = axios.create({
  baseURL: 'https://streambet-wallet.up.railway.app/api/wallet', // Base URL of your NestJS server
});

const twitchApiClient = axios.create({
  baseURL: 'https://id.twitch.tv',
})

const betApiClient = axios.create({
  baseURL: 'https://streambet-bet.up.railway.app/api',
})

type TwitchTokenResponse = {
  access_token: string; 
  refresh_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}

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

type TwitchUserData = {
  twitchUsername: string;
  twitchAccessToken: string;
  twitchRefreshToken: string;
}

export const userPostRequest = async (endpoint: string, data: any) => {
  try {
    const response = await userApiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userPatchRequest = async (endpoint: string, data: any) => {
  try {
    const response = await userApiClient.patch(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const userGetRequest = async (endpoint: string, data: any) => {
  try {
    const response = await userApiClient.get(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const walletPostRequest = async (endpoint: string, data: any) => {
  try {
    const response = await walletApiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const walletGetRequest = async (endpoint: string, data: any) => {
  try {
    const response = await walletApiClient.get(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const betGetRequest = async (endpoint: string, data: any) => {
  try {
    const response = await betApiClient.get(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const betPostRequest = async (endpoint: string, data: any) => {
  try {
    const response = await betApiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const twitchStartupPostRequest = async (code: string): Promise<TwitchTokenResponse> => {
  try {
    const requestData = {
      client_id: 'uazprb0v9zr5p11om9mo3tc99h6r6h',
      client_secret: '38l2fww55uo8ko7qp9cj1g3quk1gb2',
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3100'
    };
    const response = await twitchApiClient.post('/oauth2/token', requestData);
    return response.data; // Return the response data, not the whole response object
  } catch (error) {
    throw error;
  }
};

const refreshTwitchDetails = async (oldTwitchAccessToken: string, newTwitchAccessToken: string) => {
  try {
    userPatchRequest('/twitch/refresh', { oldTwitchAccessToken, newTwitchAccessToken });
  } catch (error) {

  }
}

const twitchRefreshPost = async (refreshToken: string): Promise<TwitchTokenResponse> => {

  try {
    const requestData = {
      client_id: 'uazprb0v9zr5p11om9mo3tc99h6r6h',
      client_secret: '38l2fww55uo8ko7qp9cj1g3quk1gb2',
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }

    const response = await twitchApiClient.post('/oauth2/token', requestData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchTwitchStreamUrl(channel: string, accessToken: string, refreshToken: string): Promise<StreamData> {
  try {
    const clientId = 'uazprb0v9zr5p11om9mo3tc99h6r6h';

    // Make a request to the Twitch API to get the stream URL
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const streamData = await response.json();

    if (streamData?.status === 401) {
      const newData = await twitchRefreshPost(refreshToken);
      refreshTwitchDetails(accessToken, newData.access_token);
      return fetchTwitchStreamUrl(channel, newData.access_token, refreshToken);
    }

    // Get the stream URL from the API response
    if (streamData?.data) {
      return streamData.data[0]
    }
  } catch (error) {
    console.error('Error fetching Twitch stream:', error);
  }
  return {}
}

export const getTwitchStreams = async (): Promise<StreamData[]> => {
  function isEmptyObject(obj: {}) {
    return obj && Object.keys(obj).length === 0;
  }
  const users = await userGetRequest('/twitch', {});
  const streamPromises = users?.map(async (user: TwitchUserData) => {
    const streamData = await fetchTwitchStreamUrl(user.twitchUsername, user.twitchAccessToken, user.twitchRefreshToken);
    if (!isEmptyObject(streamData)) {
      return streamData;
    }
  })
  return Promise.all(streamPromises);
}

export async function getTwitchChannelName(accessToken: string): Promise<string> {
  try {
    const userResponse = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': 'uazprb0v9zr5p11om9mo3tc99h6r6h'
      }
    });

    const userData = await userResponse.json();
  
    const channelName = userData.data[0].display_name;

    return channelName;
  } catch (error) {
    throw new Error('Failed to get Twitch channel name');
  }
}

export async function getOpenBetGroup(twitchUsername?: string): Promise<BetGroup> {
  try {
    return await betGetRequest(`group/streamer/${twitchUsername}`, {})
  } catch (error) {
    throw error;
  }
}

export async function placeBet(
  userId?: string,
  betGroupId?: string,
  twitchUsername?: string,
  gameTitle?: string, 
  totalBetAmount?: string, 
  betsPlaced?: BetsPlaced[] ): Promise<Bet> {
    try {
      if(userId && betGroupId && twitchUsername && gameTitle && totalBetAmount && betsPlaced) {
        return await betPostRequest(`/bet/create`, {
          userId,
          betGroupId,
          twitchUsername,
          gameTitle,
          totalBetAmount,
          betsPlaced
        })
      }
    } catch (error) {
      throw error;
    }
    return {}
  }

