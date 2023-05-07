import React, { FC, memo } from "react";

import { routes } from "@/shared/config";
import { UILink } from "@/shared/ui";

import { ListItem } from "../ListItem/ListItem";
import { ReturnUrl } from "@/shared/constants";
import { useRouter } from "next/router";

const AnonItems: FC = () => {
  const router = useRouter();
  const loginUrl = `${routes.Login()}?${ReturnUrl}=${router.asPath}`;

  return (
    <ListItem className={"!mr-0"}>
      <UILink href={loginUrl}>Login</UILink>
    </ListItem>
  );
};

export default memo(AnonItems);
