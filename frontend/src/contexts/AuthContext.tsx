import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('access_token');
    if (token) {
      // Verify token and get user data
      // This would typically make an API call to verify the token
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Make API call to login
      // For now, just simulate a successful login
      const mockUser: User = {
        id: 1,
        email,
        username: email.split('@')[0],
        first_name: '',
        last_name: '',
      };
      setUser(mockUser);
      localStorage.setItem('access_token', 'mock_token');
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      // Make API call to register
      // For now, just simulate a successful registration
      const mockUser: User = {
        id: 1,
        email: userData.email,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
      };
      setUser(mockUser);
      localStorage.setItem('access_token', 'mock_token');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
