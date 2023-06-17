import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { AuthService } from "../../api/auth-api";

import { Logger } from "@/shared/lib";

import { authKeys } from "./authKeys";

export const useConfirmUser = (token: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: authKeys.confirm(token),
    queryFn: async () => {
      try {
        const api = await AuthService();
        await api.confirm(token);
        return { message: "User confirmed successfully" };
      } catch (e: any) {
        Logger.Debug(e?.message);
        throw e;
      }
    },
    ...options,
  });
};
