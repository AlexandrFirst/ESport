import React from "react";
import { HeaderListItem } from "../ListItem/ListItem";
import { Notifications } from "../Notifications/Notifications";
import { UserAvatar } from "../../../../entities/user/components/UserAvatar/UserAvatar";

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
