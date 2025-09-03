import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

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