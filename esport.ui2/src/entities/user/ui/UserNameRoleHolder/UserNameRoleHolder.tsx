import React, { FC, memo } from "react";
import styles from "./UserNameRoleHolder.module.css";

import cn from "classnames";

import { Avatar, AvatarProps, BoldText, RegularText } from "@/shared/ui";

interface UserNameRoleHolderProps extends AvatarProps {
  boldText: string;
  regularText: string;
  avatarText?: string;
  textClassName?: string;
  avatarClassName?: string;
}

const UserNameRoleHolder: FC<UserNameRoleHolderProps> = ({
  className,
  avatarText,
  boldText,
  regularText,
  textClassName,
  avatarClassName,
  ...props
}) => {
  return (
    <ul className={cn(styles.wrapper, className)}>
      <li className={styles.avatar_wrapper}>
        <Avatar {...props} className={avatarClassName} text={avatarText} />
      </li>
      <li className={cn(styles.text_wrapper, textClassName)}>
        <BoldText>{boldText}</BoldText>
        <RegularText>{regularText}</RegularText>
      </li>
    </ul>
  );
};

export default memo(UserNameRoleHolder);
