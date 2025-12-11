import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  email: string;
  name: string;
  role: "client" | "agent";
}

interface AuthState {
  user: User | null;
  setUser: (u: User | null) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (u) => set({ user: u }),
    }),
    { name: "auth" }
  )
);
