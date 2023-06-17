import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { storageService } from "@/shared/config";
import { AuthToken } from "@/shared/constants";

import { AuthService } from "../../api/auth-api";
import { useUserActions } from "../../model/slices/userSlice";

import { authKeys } from "./authKeys";

export const useLogout = (options?: UseMutationOptions) => {
  const { resetUser } = useUserActions();

  return useMutation({
    ...options,
    mutationKey: authKeys.logout(),
    mutationFn: async () => {
      try {
        const api = await AuthService();
        await api.logout();
        resetUser();
        storageService().removeToken(AuthToken);
      } catch (e) {
        console.log("===e===", e);
        throw e;
      }
    },
  });
};
