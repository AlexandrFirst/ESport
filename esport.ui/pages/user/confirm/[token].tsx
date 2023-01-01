import React, { useEffect } from "react";
import { NextPage } from "next";
import { authService } from "@api/auth/authService";
import { useRouter } from "next/router";

const Confirm: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        authService.confirm((router.query.token as string) ?? "");
      } catch (e) {
        //TODO: handle error
      } finally {
        router.push("/");
      }
    };
    getData();
  }, []);

  return <></>;
};

export default Confirm;
