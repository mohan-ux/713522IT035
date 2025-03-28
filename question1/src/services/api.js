import axios from 'axios';
import {
  fetchUsers as fetchMockUsers,
  fetchUserPosts as fetchMockUserPosts,
  fetchPostComments as fetchMockPostComments,
  getRandomAvatar,
  getRandomImage,
} from './mockData';

// API Configuration
const BASE_URL = 'http://localhost:9876/test'; // Your actual API endpoint
const TIMEOUT = 15000; // 15 seconds timeout

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for logging and error handling
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

// Helper function to check if error is network-related
const isNetworkError = (error) => {
  return !error.response || error.code === 'ECONNABORTED' || error.message === 'Network Error';
};

// Helper function to check if error is CORS-related
const isCorsError = (error) => {
  return error.message.includes('CORS') || error.message.includes('cross-origin');
};

// Helper function to handle API errors
const handleApiError = (error, fallbackFn) => {
  if (isNetworkError(error) || isCorsError(error)) {
    console.warn('Using mock data due to API error:', error.message);
    return fallbackFn();
  }
  throw error;
};

// API Functions with fallback to mock data
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    return handleApiError(error, fetchMockUsers);
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    return handleApiError(error, () => fetchMockUserPosts(userId));
  }
};

export const fetchPostComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    return handleApiError(error, () => fetchMockPostComments(postId));
  }
};

// Export mock data utilities
export { getRandomAvatar, getRandomImage }; 