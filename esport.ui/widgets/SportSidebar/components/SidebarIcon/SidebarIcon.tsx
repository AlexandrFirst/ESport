import React, { FC, FunctionComponent } from "react";
import styles from "./sidebarIcon.module.css";

import cn from "classnames";

export type IconType = FunctionComponent<{ className?: string }>;

interface SidebarIconProps {
  className?: string;
  Icon: IconType;
}

export const SidebarIcon: FC<SidebarIconProps> = ({ className, Icon }) => {
  return <Icon className={cn(styles.icon, className)} />;
};
