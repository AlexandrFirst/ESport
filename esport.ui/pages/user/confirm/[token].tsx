import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { routes } from "routes";

import { authService } from "@entities/user";
import { useSnackbar } from "@features/SportSnackbar";

const Confirm: NextPage = () => {
  const router = useRouter();

  const { error, success } = useSnackbar();

  useEffect(() => {
    const activate = async () => {
      try {
        await authService.confirm((router.query.token as string) ?? "");
        success("Your account has been activated");
      } catch (e: any) {
        error(e.message);
      } finally {
        router.push(routes.Main);
      }
    };
    activate();
  }, [error, router, success]);

  return <></>;
};

export default Confirm;
