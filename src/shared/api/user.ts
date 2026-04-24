import { http } from "@/shared/api/http";
import { saveAuthData } from "@/shared/lib/auth";

type Result<T> = {
  isSuccess: boolean;
  error?: string | null;
  value?: T | null;
};

type UserEntity = {
  id: string;
};

export const userApi = {
  async getMe(): Promise<UserEntity | null> {
    const result = await http<Result<UserEntity>>("user/me", { method: "GET" });
    if (!result.isSuccess) {
      throw new Error(result.error ?? "User loading failed");
    }
    const user = result.value ?? null;

    if (user?.id) {
      saveAuthData(user.id);
    }

    return user;
  },
};
