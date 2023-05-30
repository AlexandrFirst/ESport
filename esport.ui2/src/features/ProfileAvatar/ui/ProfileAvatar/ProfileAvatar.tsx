import React, { FC, useState } from "react";
import styles from "./ProfileAvatar.module.css";

import { useRouter } from "next/router";

import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { routes } from "@/shared/config";
import { useSnackbar } from "@/shared/lib";
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

interface ProfileAvatarProps extends AvatarProps {}

export const ProfileAvatar: FC<ProfileAvatarProps> = ({ ...props }) => {
  const { user } = useAuth();
  const { mutate } = useLogout();

  const { showError } = useSnackbar();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await mutate();
      router.push(routes.Home());
    } catch (e: any) {
      showError(e.message);
    }
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
          regularText={""}
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
        <div className={styles.profile_link}>
          <Icon Svg={UserCircleIcon} />
          <UILink href={routes.Me()} color={"inverted"}>
            Profile
          </UILink>
        </div>
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
          {list.map(({ children, key }) => (
            <li key={key}>{children}</li>
          ))}
        </DownDrawer>
      </MobileView>
    </>
  );
};
