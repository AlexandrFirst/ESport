import React, { FC } from "react";
import { useAppSelector } from "@/shared/lib";

import { ProfileAvatar } from "@/entities/profile";
import { selectUser } from "@/entities/user";

import { ListItem } from "../ListItem/ListItem";
import { AvatarSize } from "@/shared/ui";

export const AuthItems: FC = () => {
  const user = useAppSelector(selectUser);
  const { name, avatarUrl } = user || {};

  return (
    <ListItem className={"!mr-0"}>
      <ProfileAvatar userName={name} src={avatarUrl} size={AvatarSize.Small} />
    </ListItem>
  );
};
