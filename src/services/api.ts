import axios from 'axios';

// FORCE the backend URL - don't rely on fallback to '/api'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://web-production-895d0.up.railway.app/api';

// Debug logging to verify the URL
console.log('🚀 Frontend Environment Variables:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('NODE_ENV:', import.meta.env.NODE_ENV);
console.log('MODE:', import.meta.env.MODE);
console.log('🎯 Final API_BASE_URL being used:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log(`🌐 Making API Request: ${config.method?.toUpperCase()} ${fullUrl}`);
  
  // Verify the URL doesn't contain the frontend domain
  if (fullUrl.includes('deploymentfnd-production.up.railway.app')) {
    console.error('❌ ERROR: API request going to frontend instead of backend!');
    console.error('❌ URL:', fullUrl);
  } else {
    console.log('✅ Correct: API request going to backend');
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.response?.data, error.config?.url);
    if (error.response?.status === 401) {
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