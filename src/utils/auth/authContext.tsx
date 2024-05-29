import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const signIn = async (username: string, password: string) => {
    let url = `${process.env.REACT_APP_API_ENDPOINT}/iot/signIn`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();

      const accessToken = data.data.AccessToken;

      // Lưu các token vào localStorage
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  };

  const signOut = async () => {
    try {
      let url = `${process.env.REACT_APP_API_ENDPOINT}/iot/signOut`;
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the authentication state
      setIsAuthenticated(false);
      setRole(null);
      localStorage.removeItem('accessToken');
      // Navigate to the sign-in page
      navigate('/signin');
    } catch (error) {
      console.error('Error during sign out:', error);
      // Optionally, handle error state or show an error message to the user
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, signIn, signOut }}>
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
