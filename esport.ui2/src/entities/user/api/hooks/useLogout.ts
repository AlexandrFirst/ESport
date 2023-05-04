import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { AuthService } from "../../api/auth-api";
import { useUserActions } from "../../model/slices/userSlice";

const authKeys = {
  logout: ["auth", "logout"],
};

export const useLogout = (options?: UseMutationOptions) => {
  const { resetUser } = useUserActions();

  return useMutation({
    ...options,
    mutationKey: authKeys.logout,
    mutationFn: async () => {
      try {
        await AuthService().logout();
        resetUser();
        // storageService().removeToken(AuthToken);
      } catch (e) {
        console.log("===e===", e);
        throw e;
      }
    },
  });
};
