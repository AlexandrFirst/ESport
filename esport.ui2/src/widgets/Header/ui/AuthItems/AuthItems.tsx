import React, { FC } from "react";
import { useAppSelector } from "@/shared/lib";

import { selectUser } from "@/entities/user";

import { ProfileAvatar } from "@/features/ProfileAvatar";

import { ListItem } from "../ListItem/ListItem";

export const AuthItems: FC = () => {
  const user = useAppSelector(selectUser);
  const { name, avatarUrl } = user || {};

  return (
    <ListItem className={"!mr-0"}>
      <ProfileAvatar />
    </ListItem>
  );
};