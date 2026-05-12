import { fetchJson } from "./client";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  ageGroup: string | null;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export async function apiRegister(body: {
  name: string;
  email: string;
  password: string;
}) {
  return await fetchJson<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiLogin(body: { email: string; password: string }) {
  return await fetchJson<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiMe(token: string) {
  return await fetchJson<{ user: AuthUser }>("/auth/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
}

