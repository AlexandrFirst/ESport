import React, { FC } from "react";
import styles from "./MobileSidebar.module.css";

import cn from "classnames";

interface MobileSidebarProps {
  className?: string;
}

export const MobileSidebar: FC<MobileSidebarProps> = ({ className }) => {
  return <aside className={cn(className)}>MobileSidebar</aside>;
};
