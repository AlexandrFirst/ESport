import React, { FC } from "react";
import styles from "./MobileSidebar.module.css";

import cn from "classnames";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";

import { IconButton } from "@/shared/ui";
import { useSidebarContext } from "../SidebarContext/SidebarContext";

interface MobileSidebarProps {
  className?: string;
}

export const MobileSidebar: FC<MobileSidebarProps> = ({ className }) => {
  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  const handleSetIsSidebarOpened = () => {
    setIsSidebarOpened(true);
  };

  return (
    <div className={cn(className)}>
      <IconButton
        Svg={Bars3BottomLeftIcon}
        onClick={handleSetIsSidebarOpened}
        className={styles.icon}
      />
      {/*<Drawer isOpen={isSidebarOpened}>*/}
      {/*  <SidebarMenu />*/}
      {/*</Drawer>*/}
    </div>
  );
};
