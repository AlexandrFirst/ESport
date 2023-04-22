import React, { FC, useCallback, useMemo } from "react";
import styles from "./RoleChanger.module.css";

import cn from "classnames";

import { AvatarSize, Menu, MenuList } from "@/shared/ui";
import { useAppDispatch } from "@/shared/lib";

import {
  useAuth,
  useMappedRoles,
  userActions,
  UserNameRoleHolder,
  UserRole,
} from "@/entities/user";

interface CurrentUserRoleChangerProps {
  className?: string;
  textClassName?: string;
}

export const RoleChanger: FC<CurrentUserRoleChangerProps> = ({
  className,
  textClassName,
}) => {
  const { isAuth, user, translatedRole, currentRole } = useAuth();
  const mappedRoles = useMappedRoles();
  const dispatch = useAppDispatch();

  const handleRoleChange = useCallback(
    (role: UserRole) => {
      dispatch(userActions.setCurrentRole(role));
    },
    [dispatch]
  );

  const list: MenuList = useMemo(
    () =>
      Object.entries(mappedRoles).map(([key, value]) => ({
        key,
        title: value,
        selected: currentRole === Number(key),
        onClick: () => handleRoleChange(Number(key)),
        children: <button>{value}</button>,
        className: styles.item,
      })),
    [currentRole, handleRoleChange, mappedRoles]
  );

  if (!isAuth) return null;
  return (
    <div className={cn(styles.wrapper, className)}>
      <Menu
        direction={"top center"}
        buttonClassName={styles.fullwidth}
        fullWidthList
        menuButton={
          <UserNameRoleHolder
            avatarClassName={styles.pointer}
            className={styles.pointer}
            src={user?.avatarUrl}
            avatarText={user?.name[0]}
            regularText={translatedRole}
            boldText={user?.name ?? ""}
            size={AvatarSize.Small}
            textClassName={cn(styles.text, textClassName)}
          />
        }
        list={list}
      />
    </div>
  );
};
