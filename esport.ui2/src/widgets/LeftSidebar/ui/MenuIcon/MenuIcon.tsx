import React, { FC, memo } from "react";
import styles from "./MenuIcon.module.css";

import { Icon, IconProps } from "@/shared/ui";

interface MenuIconProps extends Omit<IconProps, "iconSize"> {}

const MenuIcon: FC<MenuIconProps> = (props) => {
  return <Icon {...props} className={styles.icon} iconSize={"m"} />;
};

export default memo(MenuIcon);
