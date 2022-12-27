import { useRouter } from "next/router";

import { routes } from "routes";
import { ILoginForm } from "@features/UnloggedLayout/interfaces";
import { SportHeadComponentProps } from "@features/SportHead/SportHead";

import { useAppDispatch } from "@storage/hooks/useStore";
import { logIn } from "@storage/slices/user";
import { hideLoading, showLoading } from "@storage/slices/loadingIndicator";

import { SERVER_DELAY } from "@constants/server";

export const loginHead: SportHeadComponentProps = {
  title: "E-Sport | Enter account",
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = async (data: ILoginForm) => {
    console.log("===data===", data);
    dispatch(showLoading());
    setTimeout(() => {
      dispatch(logIn());
      dispatch(hideLoading());
      router.push(routes.Test);
    }, SERVER_DELAY);
  };

  return { login };
};
