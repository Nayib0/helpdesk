import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  setUser: (u: User | null) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));
