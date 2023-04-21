import React, { FC, useState } from "react";
import styles from "./ProfileAvatar.module.css";

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

import {
  Avatar,
  AvatarProps,
  AvatarSize,
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

import { useAuth, userActions, UserNameRoleHolder } from "@/entities/user";

interface ProfileAvatarProps extends AvatarProps {}

export const ProfileAvatar: FC<ProfileAvatarProps> = ({ ...props }) => {
  const { user, translatedRole } = useAuth();

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
        <UserNameRoleHolder
          {...props}
          boldText={user?.name ?? ""}
          regularText={translatedRole}
          src={user?.avatarUrl ?? ""}
          avatarText={user?.name[0] ?? ""}
          size={AvatarSize.Small}
          className={styles.name_holder}
        />
      ),
    },
    {
      key: "logout",
      children: (
        <div key={"logout"} className={styles.logout} onClick={handleLogout}>
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
          menuButton={
            <Avatar
              {...props}
              text={user?.name[0] ?? ""}
              size={AvatarSize.Small}
              readOnly={false}
            />
          }
          list={list}
          direction={"bottom left"}
          bold={false}
        />
      </BrowserView>
      <MobileView>
        <Avatar
          {...props}
          text={user?.name[0] ?? ""}
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
