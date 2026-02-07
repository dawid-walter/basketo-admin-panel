import { useState, useEffect } from 'react';
import { authService } from '../services/auth';
import type { AuthUser, AdminLoginRequest, ChangePasswordRequest } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials: AdminLoginRequest) => {
    await authService.login(credentials);
    const currentUser = authService.getUser();
    setUser(currentUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const changePassword = async (data: ChangePasswordRequest) => {
    await authService.changePassword(data);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    changePassword,
  };
};
