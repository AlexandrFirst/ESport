import { useRouter } from "next/router";

import { IRegisterForm } from "@features/UnloggedLayout/interfaces";
import { SportHeadComponentProps } from "@shared/SportHead/SportHead";

import { useAppDispatch } from "@storage/hooks/useStore";
import { logIn } from "@storage/slices/user";

import { routes } from "routes";

export const registerHead: SportHeadComponentProps = {
  title: "E-Sport | Create your account",
};

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const registration = (data: IRegisterForm) => {
    console.log("===data===", data);

    dispatch(logIn());
    router.push(routes.Test);
  };

  return { registration };
};
