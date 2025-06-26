export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  token: string;
}

export const MOCK_USERS: Record<string, UserSession> = {
  admin: {
    id: '1',
    name: 'Admin User',
    email: 'admin@starshop.com',
    role: 'admin',
    token: 'mock-jwt-token-admin-12345',
  },
  user: {
    id: '2',
    name: 'Regular User',
    email: 'user@starshop.com',
    role: 'user',
    token: 'mock-jwt-token-user-67890',
  },
  guest: {
    id: '3',
    name: 'Guest User',
    email: 'guest@starshop.com',
    role: 'guest',
    token: 'mock-jwt-token-guest-54321',
  },
};
