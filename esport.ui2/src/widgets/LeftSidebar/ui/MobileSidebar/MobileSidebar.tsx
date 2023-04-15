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
    <aside className={cn(className)}>
      <IconButton
        Svg={Bars3BottomLeftIcon}
        onClick={handleSetIsSidebarOpened}
        className={styles.icon}
      />
      {/*<SportSwipeableDrawer*/}
      {/*  open={isSidebarOpened}*/}
      {/*  onOpen={() => setIsSidebarOpened(true)}*/}
      {/*  onClose={() => setIsSidebarOpened(false)}*/}
      {/*  ModalProps={{*/}
      {/*    keepMounted: true, // Better open performance on mobile.*/}
      {/*  }}*/}
      {/*  sx={{*/}
      {/*    display: { xs: "block", md: "none" },*/}
      {/*    "& .MuiDrawer-paper": {*/}
      {/*      boxSizing: "border-box",*/}
      {/*      width: sidebarOpenedWidth,*/}
      {/*      zIndex: isSidebarOpened ? 1300 : 0,*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <SidebarData />*/}
      {/*</SportSwipeableDrawer>*/}
    </aside>
  );
};
