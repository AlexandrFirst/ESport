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
  UILink,
} from "@/shared/ui";

import { useAuth, useLogout, UserNameRoleHolder } from "@/entities/user";
import { routes } from "@/shared/config";

interface ProfileAvatarProps extends AvatarProps {}

export const ProfileAvatar: FC<ProfileAvatarProps> = ({ ...props }) => {
  const { user, translatedRole } = useAuth();
  const { mutate } = useLogout();

  const handleLogout = async () => {
    await mutate();
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
          src={""}
          avatarText={user?.name[0] ?? ""}
          size={AvatarSize.Small}
          className={styles.name_holder}
        />
      ),
    },
    {
      key: "profile page",
      children: (
        <UILink href={routes.User.Profile.ProfileId([user?.id])}>
          Profile
        </UILink>
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
