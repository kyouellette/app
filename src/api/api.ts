// apiService.ts
import axios from 'axios';

const userApiClient = axios.create({
  baseURL: 'http://localhost:3000/api/user', // Base URL of your NestJS server
});

const walletApiClient = axios.create({
  baseURL: 'http://localhost:3001/api/wallet', // Base URL of your NestJS server
});

const twitchStartupApiClient = axios.create({
  baseURL: 'https://id.twitch.tv',
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

export const twitchStartupPostRequest = async (code: string): Promise<TwitchTokenResponse> => {
  try {
    const requestData = {
      client_id: 'uazprb0v9zr5p11om9mo3tc99h6r6h',
      client_secret: '38l2fww55uo8ko7qp9cj1g3quk1gb2',
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3100'
    };
    const response = await twitchStartupApiClient.post('/oauth2/token', requestData);
    return response.data; // Return the response data, not the whole response object
  } catch (error) {
    throw error;
  }
};

async function fetchTwitchStreamUrl(channel: string, accessToken: string): Promise<StreamData> {
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
  const usernames = await userGetRequest('/twitch', {});
  const accessToken = 'ump9ehmjsylsgpi2kxnrc714qzh1es';
  const streamPromises = usernames?.map(async (channel: string) => {
    const streamData = await fetchTwitchStreamUrl(channel, accessToken);
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

