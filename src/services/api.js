import Cookies from 'js-cookie';
import axios from 'axios';
import { config } from '../config/env';
import store from '../store';
import { logout } from '../features/auth/authSlice';

// Initialize Axios instance
const api = axios.create({
  baseURL: config.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get token from Cookies
const getToken = () => Cookies.get('token');

// Automatically set token for every API request if available
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized, handle logout
      store.dispatch(logout()); // Dispatch the logout action
    }
    return Promise.reject(error);
  }
);

// API Methods (GET, POST, etc.)
const apiService = {
  get: async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  post: async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  put: async (endpoint, data) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  patch: async (endpoint, data) => {
    try {
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;

