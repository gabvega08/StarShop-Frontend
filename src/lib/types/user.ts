export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  token: string;
}

export interface SessionState {
  user: UserSession | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  setUser: (user: UserSession) => void;
  setToken: (token: string) => void;
  setRole: (role: 'admin' | 'user' | 'guest') => void;
}