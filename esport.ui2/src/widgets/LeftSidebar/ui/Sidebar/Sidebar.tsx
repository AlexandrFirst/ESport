import React, { FC } from "react";
import styles from "./Sidebar.module.css";

import { BrowserView, MobileView } from "@/shared/ui";

import { SidebarContextProvider } from "../SidebarContext/SidebarContext";
import { LargeScreenSidebar } from "../LargeScreenSidebar/LargeScreenSidebar";
import { MobileSidebar } from "../MobileSidebar/MobileSidebar";

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
      <MobileView>
        <MobileSidebar className={styles.mobile} />
      </MobileView>
      <BrowserView>
        <LargeScreenSidebar className={styles.large} />
      </BrowserView>
    </SidebarContextProvider>
  );
};
