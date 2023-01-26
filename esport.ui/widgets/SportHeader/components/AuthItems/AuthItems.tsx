import React from "react";

import { UserAvatar } from "@entities/user";

import { HeaderListItem } from "../ListItem/ListItem";
import { Notifications } from "../Notifications/Notifications";

export const AuthItems: React.FC = () => {
  return (
    <>
      <HeaderListItem>
        <Notifications />
      </HeaderListItem>

      <HeaderListItem>
        <UserAvatar />
      </HeaderListItem>
    </>
  );
};
