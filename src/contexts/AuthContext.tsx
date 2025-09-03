import React, { createContext, useContext, useState, useEffect } from 'react';
import * as apiService from '../services/api';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
  permissions?: string[];
  is_approved?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await apiService.checkAuthStatus();
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login(email, password);
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        // Check approval status and show message if needed
        if (!response.data.is_approved && response.data.user.role !== 'SUPER_ADMIN' && response.data.user.role !== 'ADMIN') {
          // Still return true for successful login, but the component can check approval status
          console.warn('User not approved:', response.data.message);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      
      // Check if it's an account suspension error
      if (error.response?.data?.account_suspended) {
        // Create a custom error with the suspension message
        const suspensionError = new Error(error.response.data.message);
        suspensionError.name = 'AccountSuspended';
        throw suspensionError;
      }
      
      throw error; // Re-throw to let component handle the error message
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await apiService.register(userData);
      if (response.data.success && response.data.user) {
        // Registration automatically logs the user in according to backend
        setUser(response.data.user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Re-throw to let the component handle the error
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setUser,
        setIsAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};