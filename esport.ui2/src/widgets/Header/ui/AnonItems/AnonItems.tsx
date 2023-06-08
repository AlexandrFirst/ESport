import React, { FC, memo } from "react";
import { UILink } from "@/shared/ui";

import { ListItem } from "../ListItem/ListItem";
import { useGetLoginUrl } from "@/shared/lib";

const AnonItems: FC = () => {
  const loginUrl = useGetLoginUrl();

  return (
    <ListItem className={"!mr-0"}>
      <UILink href={loginUrl}>Login</UILink>
    </ListItem>
  );
};

export default memo(AnonItems);
