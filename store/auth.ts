import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "agent";
  password?: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

function setCookie(name: string, value: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};path=/;max-age=86400`;
  }
}

function deleteCookie(name: string) {
  if (typeof window !== "undefined") {
    document.cookie = `${name}=;path=/;max-age=0`;
  }
}

function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  }
  return null;
}

function getInitialState(): User | null {
  const userCookie = getCookie("user");
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch {
      return null;
    }
  }
  return null;
}

export const useAuth = create<AuthState>((set) => ({
  user: getInitialState(),

  setUser: (user) => {
    set({ user });
    if (user) {
      setCookie("user", JSON.stringify(user));
    } else {
      deleteCookie("user");
    }
  },

  logout: () => {
    set({ user: null });
    deleteCookie("user");
  },
}));
