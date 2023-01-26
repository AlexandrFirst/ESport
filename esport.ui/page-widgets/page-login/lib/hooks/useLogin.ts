import { useRouter } from "next/router";

import { routes } from "routes";
import { useLoader } from "../../../../shared/lib/hooks/useLoader";

import { authService } from "../../../../entities/user/api/auth/authService";
import { ILoginForm } from "../../types/login-form";

export const useLogin = () => {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  return async (data: ILoginForm) => {
    try {
      showLoader();
      await authService.login(data);
      router.push(routes.Test);
    } catch (e) {
      //TODO: handle error
    } finally {
      hideLoader();
    }
  };
};
