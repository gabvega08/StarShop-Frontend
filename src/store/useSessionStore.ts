import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserSession } from '@/lib/types/user'

interface SessionState {
  user: UserSession | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: UserSession) => void;
  logout: () => void;
  setUser: (user: UserSession) => void;
  setToken: (token: string) => void;
  setRole: (role: 'admin' | 'user' | 'guest') => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user) =>
        set(() => ({
          user,
          token: user.token,
          isLoggedIn: true,
        })),

      logout: () =>
        set(() => ({
          user: null,
          token: null,
          isLoggedIn: false,
        })),

      setUser: (user) =>
        set((state) => ({
          user: { ...state.user, ...user },
        })),

      setToken: (token) =>
        set((state) => ({
          token,
          user: state.user ? { ...state.user, token } : null,
        })),

      setRole: (role) =>
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        })),
    }),
    {
      name: 'user-session', // key in localStorage
    }
  )
);