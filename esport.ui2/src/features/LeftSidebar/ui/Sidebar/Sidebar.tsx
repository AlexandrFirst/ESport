import React, { FC } from "react";
import styles from "./Sidebar.module.css";

import { SidebarContextProvider } from "../SidebarContext/SidebarContext";
import { MobileSidebar } from "../MobileSidebar/MobileSidebar";
import { LargeScreenSidebar } from "../LargeScreenSidebar/LargeScreenSidebar";

interface SidebarProps {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (p: boolean) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  setIsSidebarOpened,
  isSidebarOpened,
}) => {
  return (
    <SidebarContextProvider context={{ isSidebarOpened, setIsSidebarOpened }}>
      <MobileSidebar className={styles.mobile} />
      <LargeScreenSidebar className={styles.large} />
    </SidebarContextProvider>
  );
};
