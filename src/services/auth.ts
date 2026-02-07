import api from './api';
import type { AdminLoginRequest, AdminLoginResponse, ChangePasswordRequest, AuthUser } from '../types';

export const authService = {
  login: async (credentials: AdminLoginRequest): Promise<string> => {
    const response = await api.post<AdminLoginResponse>('/api/admin/login', credentials);
    const { accessToken } = response.data;

    // Store token and email
    localStorage.setItem('adminToken', accessToken);
    localStorage.setItem('adminEmail', credentials.email);

    return accessToken;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await api.post('/api/admin/change-password', data);
  },

  getToken: (): string | null => {
    return localStorage.getItem('adminToken');
  },

  getUser: (): AuthUser | null => {
    const email = localStorage.getItem('adminEmail');
    if (!email) return null;

    return {
      email,
      role: 'ROLE_ADMIN',
    };
  },

  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },
};
