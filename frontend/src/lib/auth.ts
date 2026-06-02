/**
 * Centralized client session for CIL Properties.
 * Uses localStorage for API calls and a cookie for middleware route protection.
 */

export const TOKEN_KEY = "cil_token";
export const USER_KEY = "cil_user";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export type SessionUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  phone?: string;
  companyName?: string;
};

export function setSession(accessToken: string, user: SessionUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(accessToken)}; path=/; max-age=${SESSION_MAX_AGE_SEC}; SameSite=Lax`;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): SessionUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
