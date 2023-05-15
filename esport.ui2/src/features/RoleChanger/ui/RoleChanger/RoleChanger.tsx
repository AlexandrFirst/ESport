import React, { FC, useCallback, useMemo } from "react";
import styles from "./RoleChanger.module.css";

import cn from "classnames";

import { AvatarSize, Menu, MenuList } from "@/shared/ui";

import { useAuth, UserNameRoleHolder, useUserActions } from "@/entities/user";
import { UserRole } from "@/shared/constants";
import { useMappedRoles } from "@/shared/lib";

interface CurrentUserRoleChangerProps {
  className?: string;
  textClassName?: string;
}

export const RoleChanger: FC<CurrentUserRoleChangerProps> = ({
  className,
  textClassName,
}) => {
  const { isAuth, user, translatedRole, role } = useAuth();
  const mappedRoles = useMappedRoles();
  const { setCurrentRole } = useUserActions();

  const handleRoleChange = useCallback(
    (role: UserRole) => setCurrentRole(role),
    [setCurrentRole]
  );

  const list: MenuList = useMemo(
    () =>
      Object.entries(mappedRoles).map(([key, value]) => ({
        key,
        title: value,
        selected: role === key,
        onClick: () => handleRoleChange(key as UserRole),
        children: <button>{value}</button>,
        className: styles.item,
      })),
    [role, handleRoleChange, mappedRoles]
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
            src={""}
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
