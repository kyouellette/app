// apiService.ts
import axios from 'axios';

const userApiClient = axios.create({
  baseURL: 'http://localhost:3000/api/user', // Base URL of your NestJS server
});

const walletApiClient = axios.create({
  baseURL: 'http://localhost:3001/api/wallet', // Base URL of your NestJS server
});

export const userPostRequest = async (endpoint: string, data: any) => {
  try {
    const response = await userApiClient.post(endpoint, data);
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
    const response = await userApiClient.post(endpoint, data);
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

