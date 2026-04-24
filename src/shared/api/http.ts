import { getAuthToken } from "@/shared/lib/auth";

const withTrailingSlash = (value: string) => (value.endsWith("/") ? value : `${value}/`);

export const getApiUrl = (path: string) => {
  const base = import.meta.env.VITE_API_BASE_URL ?? "";
  const normalizedBase = withTrailingSlash(base);
  return new URL(path, normalizedBase).toString();
};

export const http = async <T>(path: string, init?: globalThis.RequestInit): Promise<T> => {
  const token = getAuthToken();
  const headers = new Headers(init?.headers);

  if (!headers.has("Content-Type") && init?.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(getApiUrl(path), {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const raw = await response.text();
  if (!raw) {
    return undefined as T;
  }

  return JSON.parse(raw) as T;
};
