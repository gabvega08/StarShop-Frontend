export type UserSession = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  token: string;
}

export type UserRoles = "admin" | "user" | "guest";

export type SessionState = {
  user: UserSession | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  setUser: (user: UserSession) => void;
  setToken: (token: string) => void;
  setRole: (role: UserRoles) => void;
}