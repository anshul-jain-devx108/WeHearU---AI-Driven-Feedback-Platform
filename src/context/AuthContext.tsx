
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  apiKey?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  generateApiKey: () => Promise<string>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (simulated)
    const storedUser = localStorage.getItem('wehearu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login (in a real app, this would be an API call)
      const mockUser: User = {
        id: '1',
        email,
        name: 'Demo User',
        role: 'admin',
        apiKey: 'whu_' + Math.random().toString(36).substring(2, 15),
      };
      
      setUser(mockUser);
      localStorage.setItem('wehearu_user', JSON.stringify(mockUser));
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup (in a real app, this would be an API call)
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'user',
      };
      
      setUser(mockUser);
      localStorage.setItem('wehearu_user', JSON.stringify(mockUser));
      toast({
        title: "Account created!",
        description: "Welcome to WeHearU.",
      });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wehearu_user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const generateApiKey = async (): Promise<string> => {
    // Simulate API call to generate a new API key
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newApiKey = 'whu_' + Math.random().toString(36).substring(2, 15);
    
    if (user) {
      const updatedUser = { ...user, apiKey: newApiKey };
      setUser(updatedUser);
      localStorage.setItem('wehearu_user', JSON.stringify(updatedUser));
    }
    
    toast({
      title: "API Key Generated",
      description: "Your new API key is ready to use.",
    });
    
    return newApiKey;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      generateApiKey,
    }}>
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
