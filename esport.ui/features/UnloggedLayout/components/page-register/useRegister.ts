import { IRegisterForm } from "@features/UnloggedLayout/interfaces";

import { authService } from "@api/auth/authService";

import { logIn } from "@storage/slices/user";
import { useAppDispatch } from "@storage/hooks/useStore";
import { useLoader } from "@hooks/useLoader";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { showLoader, hideLoader } = useLoader();

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
      }
    } catch (e) {
      //TODO: handle error
    } finally {
      hideLoader();
    }
  };
};
