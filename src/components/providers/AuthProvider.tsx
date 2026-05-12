"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiLogin, apiMe, apiRegister, type AuthUser } from "@/lib/api/auth";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

const TOKEN_KEY = "picode_token";
const USER_KEY = "picode_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    async function boot() {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedUserRaw = localStorage.getItem(USER_KEY);
        const storedUser = storedUserRaw
          ? (JSON.parse(storedUserRaw) as AuthUser)
          : null;

        if (storedToken) {
          setToken(storedToken);
          if (storedUser) setUser(storedUser);
          const me = await apiMe(storedToken);
          if (me.ok) {
            setUser(me.data.user);
            localStorage.setItem(USER_KEY, JSON.stringify(me.data.user));
          } else {
            logout();
          }
        }
      } finally {
        setLoading(false);
      }
    }
    boot();
  }, [logout]);

  const login = useCallback(async (input: { email: string; password: string }) => {
    const res = await apiLogin(input);
    if (!res.ok) throw new Error(res.message || "Login failed");
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem(TOKEN_KEY, res.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
  }, []);

  const register = useCallback(
    async (input: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await apiRegister(input);
      if (!res.ok) throw new Error(res.message || "Register failed");
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem(TOKEN_KEY, res.data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    },
    [],
  );

  const value = useMemo<AuthState>(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

