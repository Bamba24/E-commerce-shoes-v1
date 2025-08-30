'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserFromToken } from '../utils/auth';

type User = {
  id: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
} | null;

type AuthContextType = {
  user: User;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const userData = getUserFromToken();
    if (userData && (userData.role === 'CLIENT' || userData.role === 'ADMIN')) {
      setUser({
        ...userData,
        role: userData.role,
      });
    }
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('token', token);
    router.push('/produits');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
