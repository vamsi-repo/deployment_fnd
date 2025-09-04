import axios from 'axios';

// Use environment variable for API URL in production
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      console.warn('Unauthorized request - user may need to login');
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const checkAuthStatus = () =>
  api.get('/check-auth');

export const login = (username: string, password: string) => {
  return api.post('/authenticate', { email: username, password }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const register = (userData: {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
}) => {
  return api.post('/register', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const logout = () =>
  api.post('/logout');

// User Management endpoints
export const getAllUsers = () =>
  api.get('/users');

export const getPendingUsers = () =>
  api.get('/users/pending');

export const approveUser = (userId: number) =>
  api.post(`/users/${userId}/approve`);

export const updateUserRole = (userId: number, role: string) =>
  api.put(`/users/${userId}/role`, { role });

export const activateUser = (userId: number) =>
  api.post(`/users/${userId}/activate`);

export const deactivateUser = (userId: number) =>
  api.post(`/users/${userId}/deactivate`);

export const getRoles = () =>
  api.get('/roles');

export default api;