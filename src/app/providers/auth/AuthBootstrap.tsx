import { useEffect, useRef } from "react";
import { getApiUrl } from "@/shared/api/http";
import { userApi } from "@/shared/api/user";
import { getUserId, saveAuthData } from "@/shared/lib/auth";

type LoginResponse = {
  user?: {
    id?: string;
  };
  token?: string;
};

export const AuthBootstrap = () => {
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) {
      return;
    }
    startedRef.current = true;

    const bootstrapLogin = async () => {
      try {
        const userId = getUserId();
        const response = await fetch(getApiUrl("auth/login"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId ?? null,
          }),
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as LoginResponse;
        saveAuthData(data.user?.id, data.token);

        if (data.token) {
          await userApi.getMe();
        }
      } catch {
        // Silent fail for bootstrap auth in MVP.
      }
    };

    void bootstrapLogin();
  }, []);

  return null;
};
