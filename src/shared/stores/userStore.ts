import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, UserStore } from '@/shared/types/user';

const initialState: User = {
  walletAddress: '',
  role: 'buyer',
  name: '',
  email: '',
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: user => set(state => ({ ...state, ...user })),
      updateUser: updates => set(state => ({ ...state, ...updates })),
      clearUser: () => set(initialState),
      setWalletAddress: walletAddress => set({ walletAddress }),
      setRole: role => set({ role }),
      setName: name => set({ name }),
      setEmail: email => set({ email }),
      isAuthenticated: () => {
        const state = get();
        return Boolean(state.walletAddress && state.name && state.email);
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        walletAddress: state.walletAddress,
        role: state.role,
        name: state.name,
        email: state.email,
      }),
      onRehydrateStorage: () => state => {
        if (state) {
          console.log('User store rehydrated:', state);
        }
      },
    }
  )
);

export const useUserWalletAddress = () =>
  useUserStore(state => state.walletAddress);
export const useUserRole = () => useUserStore(state => state.role);
export const useUserName = () => useUserStore(state => state.name);
export const useUserEmail = () => useUserStore(state => state.email);
export const useIsAuthenticated = () =>
  useUserStore(state => state.isAuthenticated());

export const useUser = () =>
  useUserStore(state => ({
    walletAddress: state.walletAddress,
    role: state.role,
    name: state.name,
    email: state.email,
    isAuthenticated: state.isAuthenticated(),
  }));

export const useSetUser = () => useUserStore(state => state.setUser);
export const useUpdateUser = () => useUserStore(state => state.updateUser);
export const useClearUser = () => useUserStore(state => state.clearUser);
export const useSetWalletAddress = () =>
  useUserStore(state => state.setWalletAddress);
export const useSetRole = () => useUserStore(state => state.setRole);
export const useSetName = () => useUserStore(state => state.setName);
export const useSetEmail = () => useUserStore(state => state.setEmail);

export const useUserActions = () => ({
  setUser: useUserStore.getState().setUser,
  updateUser: useUserStore.getState().updateUser,
  clearUser: useUserStore.getState().clearUser,
  setWalletAddress: useUserStore.getState().setWalletAddress,
  setRole: useUserStore.getState().setRole,
  setName: useUserStore.getState().setName,
  setEmail: useUserStore.getState().setEmail,
});

export const getSavedUser = () => {
  const state = useUserStore.getState();
  return {
    walletAddress: state.walletAddress,
    role: state.role,
    name: state.name,
    email: state.email,
    isAuthenticated: state.isAuthenticated(),
  };
};
