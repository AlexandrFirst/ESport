import React, { FC } from "react";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

import {
  Avatar,
  AvatarProps,
  BoldText,
  Icon,
  ItemPadding,
  Menu,
  MenuList,
} from "@/shared/ui";
import { useAppDispatch } from "@/shared/lib";
import { userActions } from "@/entities/user";

interface ProfileAvatarProps extends AvatarProps {
  userName?: string;
}

export const ProfileAvatar: FC<ProfileAvatarProps> = ({
  userName = "Profile",
  ...props
}) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userActions.resetUser());
  };

  const list: MenuList = [
    {
      key: "1",
      disabled: true,
      itemPadding: ItemPadding.None,
      children: () => (
        <div className={"flex items-center cursor-auto px-3 py-1.5 border-b"}>
          <div className={"mr-5"}>
            <Avatar {...props} text={userName[0]} />
          </div>
          <div className={"flex flex-col min-w-[100px]"}>
            <BoldText>{userName}</BoldText>
            <p>Admin</p>
          </div>
        </div>
      ),
    },
    {
      key: "logout",
      children: () => (
        <div
          className={"flex items-center cursor-auto px-3 py-1.5 cursor-pointer"}
          onClick={handleLogout}
        >
          <Icon Svg={ArrowLeftOnRectangleIcon} />
          <BoldText className={"ml-3"}>Logout</BoldText>
        </div>
      ),
    },
  ];

  return (
    <Menu
      menuButton={<Avatar {...props} text={userName[0]} readOnly={false} />}
      list={list}
      direction={"bottom left"}
      bold={false}
    />
  );
};
