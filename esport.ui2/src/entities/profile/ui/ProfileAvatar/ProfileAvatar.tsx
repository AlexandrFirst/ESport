import React, { FC, useState } from "react";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

import {
  Avatar,
  AvatarProps,
  BoldText,
  BrowserView,
  DownDrawer,
  Icon,
  ItemPadding,
  Menu,
  MenuList,
  MobileView,
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

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const handleCloseDrawer = () => setIsDrawerOpened(false);
  const handleOpenDrawer = () => setIsDrawerOpened(true);

  const list: MenuList = [
    {
      key: "1",
      disabled: true,
      itemPadding: ItemPadding.None,
      children: (
        <div
          key={"1"}
          className={"flex items-center cursor-auto px-3 py-1.5 border-b"}
        >
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
      children: (
        <div
          key={"logout"}
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
    <>
      <BrowserView>
        <Menu
          menuButton={<Avatar {...props} text={userName[0]} readOnly={false} />}
          list={list}
          direction={"bottom left"}
          bold={false}
        />
      </BrowserView>
      <MobileView>
        <Avatar
          {...props}
          text={userName[0]}
          readOnly={false}
          onClick={handleOpenDrawer}
        />
        <DownDrawer onClose={handleCloseDrawer} isOpen={isDrawerOpened}>
          {list.map(({ children }) => children)}
        </DownDrawer>
      </MobileView>
    </>
  );
};
