import React, { FC, memo } from "react";

import { routes } from "@/shared/config";
import { UILink } from "@/shared/ui";

import { ListItem } from "../ListItem/ListItem";

const AnonItems: FC = () => {
  return (
    <ListItem className={"!mr-0"}>
      <UILink href={routes.Login()}>Login</UILink>
    </ListItem>
  );
};

export default memo(AnonItems);
