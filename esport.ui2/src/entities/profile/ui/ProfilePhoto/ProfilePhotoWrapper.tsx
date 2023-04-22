import React, { FC, ReactNode } from "react";
import styles from "./ProfilePhoto.module.css";

import cn from "classnames";

interface ProfilePhotoWrapperProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
}

export const ProfilePhotoWrapper: FC<ProfilePhotoWrapperProps> = ({
  className,
  size = "md",
  children,
}) => {
  return (
    <div className={cn(styles.wrapper, className, styles[size])}>
      {children}
    </div>
  );
};
