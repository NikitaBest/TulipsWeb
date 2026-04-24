const STORAGE_KEYS = {
  sessionId: "sessionId",
  userId: "userId",
  accessToken: "accessToken",
} as const;

export const getOrCreateSessionId = (): string => {
  const existing = localStorage.getItem(STORAGE_KEYS.sessionId);
  if (existing) {
    return existing;
  }

  const next = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEYS.sessionId, next);
  return next;
};

export const saveAuthData = (userId?: string, token?: string) => {
  if (userId) {
    localStorage.setItem(STORAGE_KEYS.userId, userId);
  }

  if (token) {
    localStorage.setItem(STORAGE_KEYS.accessToken, token);
  }
};

export const getAuthToken = () => localStorage.getItem(STORAGE_KEYS.accessToken);
export const getUserId = () => localStorage.getItem(STORAGE_KEYS.userId);

export const authStorageKeys = STORAGE_KEYS;
