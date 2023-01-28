import { useRouter } from "next/router";

import { IRegisterForm } from "../../../../layouts/UnloggedLayout/interfaces";

import { authService } from "../../../../entities/user/api/auth/authService";

import { logIn } from "../../../../entities/user/model/user.slice";
import { useAppDispatch } from "../../../../shared/lib/hooks/useStore";

import { useLoader } from "@features/TopPageLoader/lib/hooks/useLoader";

import { routes } from "routes";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { showLoader, hideLoader } = useLoader();
  const router = useRouter();

  return async (data: IRegisterForm) => {
    try {
      showLoader();
      const { isSuccess } = await authService.register({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: data.firstName,
        surname: data.lastName,
        telephoneNumber: data.telephoneNumber,
      });
      if (isSuccess) {
        dispatch(logIn());
        router.push(routes.Test);
      }
    } catch (e) {
      //TODO: handle error
    } finally {
      hideLoader();
    }
  };
};
