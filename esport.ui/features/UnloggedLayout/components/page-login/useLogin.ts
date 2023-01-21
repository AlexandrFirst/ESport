import { useRouter } from "next/router";

import { routes } from "routes";
import { ILoginForm } from "@features/UnloggedLayout/interfaces";
import { SportHeadComponentProps } from "@features/SportHead/SportHead";
import { useLoader } from "@hooks/useLoader";

import { authService } from "@api/auth/authService";

export const loginHead: SportHeadComponentProps = {
  title: "E-Sport | Enter account",
};

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
